$(document).on('click', '.cart-add-props-product_btn-block a', function (e) {
    e.preventDefault();
    var propsBlock = $(this).parents('.cart-add-props-product_block');
    $(this).toggleClass('show');
    propsBlock.find('.cart-add-props-product_body').toggleClass('show');

    var item = $(this).data('item');
    if (parseInt(item) > 0) {
        $('#block_' + item).toggleClass('show');
        reloadSlider($('#block_' + item));
    }
});

$(document).on('change', '.cart-add-props-product_body .custom-radio input', function (e) {
    var value = $(this).val(),
        basketId = $(this).data('basket-id');
    if (basketId > 0 && value) {
        $.ajax({
            url: urlAjaxBasketChangeOption,
            type: 'post',
            data: {
                basketId: basketId,
                option: value
            }
        });
    }
});

$(document).on('keyup', '.cart-add-props-product_body .cart-add-props-product_message textarea', function (e) {
    var value = $(this).val(),
        basketId = $(this).data('basket-id');
    if (basketId > 0 && value) {
        $.ajax({
            url: urlAjaxBasketChangeOption,
            type: 'post',
            data: {
                basketId: basketId,
                comment: value
            }
        });
    }
});

BX.ready(function () {
    BX.addCustomEvent('onBasketPageReload', function (e) {
        if ($('#season-data').length == 0)
            return;
        showLoaderBasket();
        $.ajax({
            data: {
                reload: 'Y',
            },
            success: function (res) {
                $('#basket-items').html(res);

                $('.goods__list .flexslider').flexslider('destroy');
                $('.not-avail-block').each(function() {

                })
                BX.onCustomEvent('onBasketAjaxReload');
                endLoaderBasket();
            }
        })
    })
})

function reloadSlider(block) {

    block.find('.goods__list .flexslider').flexslider('destroy');
    block.find('.goods__list .flexslider').flexslider({
        animation: 'slide',
        move: 0,
        itemWidth: 200,
        itemMargin: 0,
        minItems: 3,
        maxItems: 3,
        controlNav: false,
        directionNav: true,
        animationSpeed: 2000,
        touch: true,
    });
}

$(document).ready(function () {

})


function showLoaderBasket() {
    if (!window.loadingScreenBasket) {
        window.loadingScreenBasket = new BX.PopupWindow("loading_screen", null, {
            overlay: {backgroundColor: 'white', opacity: '80'},
            events: {
                onAfterPopupShow: BX.delegate(function () {
                    BX.cleanNode(window.loadingScreenBasket.popupContainer);
                    BX.removeClass(window.loadingScreenBasket.popupContainer, 'popup-window');
                    this.loadingScreenBasket.popupContainer.appendChild(
                        BX.create('IMG', {props: {src: "/bitrix/templates/main_adaptive_new/loader.gif"}})
                    );
                    window.loadingScreenBasket.popupContainer.removeAttribute('style');
                    window.loadingScreenBasket.popupContainer.style.display = 'block';
                }, this)
            }
        });
        BX.addClass(window.loadingScreenBasket.popupContainer, 'bx-step-opacity');
    }
    window.loadingScreenBasket.show();
}

function endLoaderBasket() {
    if (window.loadingScreenBasket && window.loadingScreenBasket.isShown())
        window.loadingScreenBasket.close();
}

//scroll to top, basket page
$(document).ready(function(){
 
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
   
  $('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
 
});