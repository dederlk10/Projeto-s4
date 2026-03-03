$(document).ready(function() {

    const menu = $('#menu-principal');
    const btnMenu = $('#menu');
    const btnClose = $('#menuX');

    function toggleMenu() {
        const menuAberto = menu.hasClass('menu-aberto');

        if (menuAberto) {
            menu.removeClass('menu-aberto');
            btnMenu.show();
            btnClose.hide();
        } else {
            menu.addClass('menu-aberto');
            btnMenu.hide();
            btnClose.show();
        }
    }

    // Clique nos botões (igual estrutura do 2)
    $('#icone-menu li#menu, #icone-menu li#menuX').on('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Fecha ao clicar em link (com lógica do 1 adaptada ao 2)
    $('#menu-principal li a').on('click', function() {
        if (window.innerWidth <= 630) {
            menu.removeClass('menu-aberto');
            btnMenu.show();
            btnClose.hide();
        }
    });

    // Reseta ao redimensionar tela
    $(window).on('resize', function() {
        if (window.innerWidth > 630) {
            menu.removeClass('menu-aberto');
            btnMenu.show();
            btnClose.hide();
        }
    });

});
