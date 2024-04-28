$(function () {

    var listPersonagens = [];

   buscaAPIPersonagens();

$('#personagem').keypress(function (e) {

    var key = e.which;
    if(key == 13)  
     {
       $("#btn_buscar").click();
       return false;  
     }
   });

   $("#btn_buscar").click(function() {

       document.getElementById("divBtnBuscar").style.display = "none";
       document.getElementById("loading").style.display = "block";
       
       var campoPersonagem = escapeRegExp($('#personagem').val()).trim();

       if(campoPersonagem.length > 0)
       {
           //var filtrado = listPersonagens.filter(function(obj) { return obj.name == campoPersonagem; });
           //var filtrado = listPersonagens.filter(obj => obj.name.toLowerCase().search(campoPersonagem.toLowerCase()) !== -1);
           var filtrado = listPersonagens.filter(obj => new RegExp(campoPersonagem.toLowerCase(), 'i').test(obj.name.toLowerCase()));

           carregaDadosTabela(filtrado);
       }
       else
       {
           carregaDadosTabela(listPersonagens);
       }

       document.getElementById("divBtnBuscar").style.display = "block";
       document.getElementById("loading").style.display = "none";
   });

   $(window).scroll(function () {
         if($(this).scrollTop() > 200)
         {
             if (!$('.main_header').hasClass('fixed'))
             {
                 $('.main_header').stop().addClass('fixed').css('top', '-100px').animate(
                     {
                         'top': '0px'
                     }, 500);
             }
         }
         else
         {
             $('.main_header').removeClass('fixed');
         }
   });

   function buscaAPIPersonagens()
   {
       document.getElementById("divBtnBuscar").style.display = "none";
       document.getElementById("loading").style.display = "block";

       var url = 'https://rickandmortyapi.com/api/character/?page=#pagina#';

       var resultado = httpGet(url.replace('#pagina#',1));
       var totalPaginas = resultado.info.pages +1;

       for (var i = 1; i < totalPaginas; i++) {

          var resultadoAPI = httpGet(url.replace('#pagina#',i));

          for (var x = 0; x < resultadoAPI.results.length; x++) {
               listPersonagens.push(resultadoAPI.results[x]);
           }
       }
      
       carregaDadosTabela(listPersonagens);

       document.getElementById("divBtnBuscar").style.display = "block";
       document.getElementById("loading").style.display = "none";
   }

   function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function carregaDadosTabela(dados) {
        var $container = $('#tabelaDesenhos');
        $container.empty();
    
        if (dados && dados.length > 0) {
            var rowCounter = 0;
            var $row = $('<div>').addClass('row');
    
            dados.forEach(function (value, index) {
                var $card = $('<div>').addClass('card col-md-4 mb-3');
                var $cardBody = $('<div>').addClass('card-body');
                var $cardTitle = $('<h5>').addClass('card-title').text(value.name);
                var $cardImage = $('<img>').addClass('card-img-top').attr('src', value.image).attr('alt', value.name).attr('width', '100').attr('height', '100');
    
                $cardBody.append($cardTitle);
                $cardBody.append($cardImage);
                $card.append($cardBody);
                $row.append($card);
    
                rowCounter++;
                if (rowCounter % 3 === 0 || index === dados.length - 1) {
                    $container.append($row);
                    $row = $('<div>').addClass('row');
                }
            });
        } else {
            var $noResults = $('<div>').addClass('alert alert-warning').text('Nenhum resultado encontrado');
            $container.append($noResults);
        }
    }
    
   
   function httpGet(theUrl)
   {
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
       xmlHttp.send( null );
       return jQuery.parseJSON(xmlHttp.responseText);
   }

});