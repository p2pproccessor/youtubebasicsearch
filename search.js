    // Google API key.
    var api_key = "Api keyi buraya yapıstırınız";
    // Sayfa Başı toplam kayıt 0 ile 50 arası.
    var maxKayit = "20";

//  sonraki Önceki sayfa verisini tutan değişkenlerimiz
var nextPageToken, prevPageToken;

// sayfa yorumlaması tarayıcıda tamamlandığında]
$(document).ready(function () {
    // bilgi var ise (form gönderildi ise)
    $('#search-term').submit(function (event) {
        event.preventDefault();
        // formdaki veriyi jquery ile alalım
        var searchTerm = $('#query').val();
        // kayıtları getir
        getRequest(searchTerm,"");
    });
    
    // sonraki butona tıklandığında
     $('#SonrakiButton').click(function() {
         var searchTerm = $('#query').val();
         // kayıtları getir
        getRequest(searchTerm,nextPageToken);
		scroll(0, 0);
    });
    
    // önceki butona tıklandığında
     $('#OncekiButton').click(function() {
         var searchTerm = $('#query').val();
         // kayıtları getir
        getRequest(searchTerm,prevPageToken);
		scroll(0, 0);
    });
    
});

// kayıtları getir
function getRequest(searchTerm,PageToken) {
    url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: api_key,
        q: searchTerm,
        maxResults:maxKayit,
        pageToken:PageToken
    };
    $.getJSON(url, params, function (searchTerm) {
        // kayıt varsa gösterecek olan function'a gönder
        showResults(searchTerm);
    });
}

// kayıtları parçalayacak olan function
function showResults(results) {
    
    // sonunda tüm verileri tek seferde yazdırmak istediğim için değişkenim
    var html = "";
    
     // items istenilen sayfa bası kayıt sayısı kadar veri içeren degişkenimiz (bulunan sonuçlar)
     // nextPageToken sonraki sayfa için kullanılacak değişken
     // prevPageToken Önceki sayfa için kullanılacak değişken
     // totalResults aranan kelime ile ilgili bulunan toplam sonuç
    var items = results.items;
    nextPageToken = results.nextPageToken;
    prevPageToken = results.prevPageToken;
    var totalResults = results.pageInfo.totalResults;
    
    // toplam sonucu sonra yazdırmak üzere html değişkenine ekliyoruz
    html += 'toplam sonuc: ' + totalResults + '<br>';
    html += '<hr><br>';

     // items değişkeninde bulunan sonuçları parcalayıp verileri alıyoruz
     // burada each döngüsü maxResults kadar olacaktır çünkü items değişkenimde okadar kayıtlı veri var
    $.each(items, function (index, value) {
        
        // alttaki değişkenlerin tanımını türkçe yaptım anlaşılması için o yüzden tek tek açıklamıyorum
        var baslik = value.snippet.title;
        var aciklama = value.snippet.description;
        var kanal = value.snippet.channelTitle;
        var tarih = value.snippet.publishedAt;
        var resim_m = value.snippet.thumbnails.medium.url;

        var videoId = value.id.videoId;
        
        // burada foreach dönmeye devam ettikçe html değişkenimize yeni kayıtları da ekliyoruz
        html += '<a href="https://www.youtube.com/embed/' + videoId + '?autoplay=1" </a> <br>';
		html += 'baslik: ' + baslik + '<br>';
        html += 'aciklama: ' + aciklama + '<br>';
        html += 'kanal: ' + kanal + '<br>';
        html += 'tarih: ' + tarih + '<br>';
        
        html += '<img src="' + resim_m + '">';
        
    }); 
    
    // ve artık tamamlanmış html değişkenini jquery ile html sayfamızdaki <div id="search-results"> div'e yazdırıyoruz.
    $('#search-results').html(html);
}
