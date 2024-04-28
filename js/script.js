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

   function carregaDadosTabela(dados)
   {
       var content =''; 

       if(dados.length > 0)
       {
         var content = '<tr><th>NOME</th><th>IMAGEM</th></tr>';
       }
       else
       {
         var content = '<tr><th>Nenhum resultado encontrado</th></tr>';
       }

       $.each(dados, function(index, value) {
           
           content += '<tr id="' + value.id + '">';
           content += '<td> <b>' + value.name  + ' </b></td>';
           content += '<td> <img src="' +  value.image + '" alt="' +  value.name + '" width="80" height="80"></td>';
           content += '</tr>';

       });
       
       $('#tabelaDesenhos tbody').html(content);
   }
   
   function httpGet(theUrl)
   {
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
       xmlHttp.send( null );
       return jQuery.parseJSON(xmlHttp.responseText);
   }

});