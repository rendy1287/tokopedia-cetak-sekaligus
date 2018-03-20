// ==UserScript==
// @name         Tokopedia Cetak Sekaligus
// @author       Rendi Wahyudi Muliawan (Celleven Store)
// @namespace    http://www.tokopedia.com/celleven
// @source       https://github.com/rendy1287/tokopedia-cetak-sekaligus
// @version      0.03
// @description  Untuk mencetak label alamat pada Tokopedia bagi pengguna Non / Bukan Gold Merchant.
// @license      Anda diperbolehkan menyalin dan mengedit script ini, tapi mohon cantumkan author dan website kami.
// @match        https://www.tokopedia.com/myshop_order_process.pl*
// @match        https://tokopedia.com/myshop_order_process.pl*
// @include      https://www.tokopedia.com/myshop_order_process.pl*
// @include      https://tokopedia.com/myshop_order_process.pl*
// @run-at       document-end
// ==/UserScript==

//***************** PERHATIAN **************************************//
//
// Mohon mempergunakan script ini dengan baik, script ini diguna-
// kan bagi Anda yang masih mau memulai jualan lewat Tokopedia,
// toko baru, dan masih belajar berjualan.
// Tidak disarankan bagi yang sudah badge Gold 1 ke atas untuk
// menggunakan script ini, mohon untuk mendukung Tokopedia juga
// dengan berlangganan Gold Merchant.
// Tokopedia sangat bergantung dengan Gold Merchant Anda-anda se-
// kalian untuk kelangsungan hidup perusahaan kedepannya.
// Tokopedia maju juga dengan bantuan pembeli dan penjual, tidak
// ada pembeli dan penjual maka Tokopedia tidak ada seperti
// sekarang.
//
//******************************************************************//

//***************** PENGATURAN *************************************//
//
// @logokamu      URL logo toko jika kamu ingin cantumkan logo
//                isikan url image kamu, bisa upload ke image hosting
//                logo recommended size: 115x25 pixel
//
// @ekspedisi     menampilkan logo ekspedisi, isikan true jika
//                ingin menampilkan atau false jika tidak
//
// @invoice       menampilkan nomor invoice, isikan true jika
//                ingin menampilkan atau false jika tidak
//
// @fontsize      ukuran font untuk label
//
//******************************************************************//

var logokamu  = 'http://www.domainkamu.com/logo.jpg';
var ekspedisi = false;
var invoice   = false;
var fontsize  = '15px';

//*****************************************************************//
//
//  SCRIPT DI BAWAH INI JANGAN DIUBAH JIKA TIDAK MENGERTI
//
//*****************************************************************//

var btncetak, cetak;

(function() {
    'use strict';

    // cek apakah sudah klik tombol Cetak Sekaligus?
    cetak = get_query_string().print;

    if (cetak == '1')
    {
        cetak_alamat();
    }
    else
    {
        cetak_button();
    }


})();

// fungsi ini menampilkan label cetak alamat
function cetak_alamat()
{
    $('html').empty();
    $('html').html('<head><title>Cetak Slip Alamat</title></head><body>Di sini untuk mencetak alamat</body>');

}

// fungsi ini menampilkan tombol Cetak Sekaligus pada halaman konfirmasi pemesanan
function cetak_button()
{
    btncetak  = '<style>button.t-c-s{background-color: #3a87ad; border: 1px solid #3a87ad; color: white;}' +
                'button.t-c-s:hover{background-color: #3a679d; border: 1px solid #3a679d; color: white;}</style>' +
                '<button class="btn btn-small mr-5 t-c-s">' +
                '<i class="icon-fax-alt"></i> ' + ($('html').attr('lang') == 'id' ? 'Cetak Sekaligus' : 'Print Multiple') + '</button>';

    $(btncetak).insertAfter('button.confirm-multiple');

    $('button.t-c-s').click(function()
    {
        var id = '';
        $('input.order_checkbox').each(function ()
        {
            var checked = (this.checked ? $(this).val() : '');
            if (checked != '') id += (id == '' ? checked : '-' + checked);
        });

        if (id == '')
        {
            var message_error = tokopedia.render_message('error', tokopedia.loc('ERROR_CHOOSE_ORDER'));
            tokopedia.alert($(this).text(), message_error);
            return false;
        }

        window.open('https://www.tokopedia.com/myshop_order_process.pl?print=1&id=' + id);
    });
}

// Read a page's GET URL variables and return them as an associative array.
function get_query_string()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}
