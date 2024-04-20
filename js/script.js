$(function () {

    console.log('teste');
    buscaAPIPersonagens();

    $("#btn_buscar").click(function() {
        //buscaAPIPersonagens();
    });

    //HEADER
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
        var pagina = 1;
        var url = 'https://rickandmortyapi.com/api/character/?page=' + pagina;
        
        var resultado = httpGet(url);
       
        console.log(resultado.results);

        carregaDadosTabela(resultado.results);
    }

    function carregaDadosTabela(dados)
    {
        var content = '';
        
        $.each(dados, function(index, value) {
            
            console.log(index + ' :  id' + value.id  + '  nome' + value.name  + ' img: ' +  value.image);

            content += '<tr id="' + value.id + '">';
            content += '<td>' +  value.id + '</td>';
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