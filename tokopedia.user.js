// ==UserScript==
// @name         Tokopedia Cetak Sekaligus Non Gold Merchant
// @author       Rendi Wahyudi Muliawan
// @namespace    http://www.tokopedia.com/celleven
// @source       https://github.com/rendy1287/tokopedia-cetak-sekaligus
// @version      0.03
// @description  Untuk mencetak label alamat pada Tokopedia bagi pengguna Non / Bukan Gold Merchant.
// @license      Anda diperbolehkan menyalin dan mengedit script ini, tapi mohon cantumkan author dan website kami.
// @icon         https://ecs7.tokopedia.net/img/favicon.ico
// @match        https://www.tokopedia.com/myshop_order_process.pl*
// @match        https://tokopedia.com/myshop_order_process.pl*
// @include      https://www.tokopedia.com/myshop_order_process.pl*
// @include      https://tokopedia.com/myshop_order_process.pl*
// @run-at       document-end
// @require      https://github.com/rendy1287/tokopedia-cetak-sekaligus/raw/master/template/1.js
// ==/UserScript==
//
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

// Template Label bisa kamu ganti pada @require di atas
// Template Label saat ini hanya tersedia 1 sampai 3
// Ubah 1.js menjadi 2.js atau 3.js dan seterusnya
// Untuk mengubah template label
// Untuk melihat semua template yang tersedia silakan buka
// https://github.com/rendy1287/tokopedia-cetak-sekaligus/template/

//*****************************************************************//
//
//  SCRIPT DI BAWAH INI JANGAN DIUBAH JIKA TIDAK MENGERTI
//
//*****************************************************************//

var html = '<div class="cetak_sekaligus"></div>';

(function() {
    'use strict';

    var btncetak  = '<style>button.t-c-s{background-color: #3a87ad; border: 1px solid #3a87ad; color: white;}' +
                'button.t-c-s:hover{background-color: #3a679d; border: 1px solid #3a679d; color: white;}</style>' +
                '<button class="btn btn-small mr-5 t-c-s">' +
                '<i class="icon-fax-alt"></i> ' + ($('html').attr('lang') == 'id' ? 'Cetak Sekaligus' : 'Print Multiple') + '</button>';

    $(btncetak).insertAfter('button.confirm-multiple');

    $(html).insertBefore('footer.footer-wrapper');

    $(document).on('change', 'input.order_checkbox', function() {
        set_print_label($(this));
    });

    $(document).on('change', 'input.checkall', function() {
        $('input.order_checkbox').each(function ()
        {
            set_print_label($(this));
        });
    });

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

        var blank = window.open('about:blank', '_blank');
        blank.document.write(html);
    });

})();

function set_print_label(element)
{
    var id = element.val();

    var nama_toko = $('div.top-admin').find('a.break-word').val();

    console.log(nama_toko);

    var nama_penerima = $('tr#order-' + id + ' td input.dest_receiver_name').val();
    var alamat_penerima = $('tr#order-' + id + ' td input.dest_receiver_name').val();
    var telepon_penerima = '';
    var ekspedisi = $('tr#order-' + id + ' td input.ship_shipping_name').val();
    var ongkir = $('tr#order-' + id + ' td input.ship_shipping_price').val();
    var nama_pengirim = $('tr#order-' + id + ' td input.dropship_name').val();
    var telepon_pengirim = $('tr#order-' + id + ' td input.dropship_telp').val();
    var alamat_pengirim = $('tr#order-' + id + ' td input.shop_pickup_location').val();
    var invoice = $('tr#order-' + id + ' td input.order_invoice').val();
    var administrasi = '';
    var asuransi = $('tr#order-' + id + ' td input.order_add_price').val();
    var logo_asuransi = '';
    var berat = '';
    var total_harga = $('tr#order-' + id + ' td input.order_open_amt').val();
    var tipe_pembayaran = $('tr#order-' + id + ' td input.pay_payment_method').val();

    $('tr#order-' + id + ' td div.products').each(function ()
    {
        var gambar_produk = $(this).find('input.product_pic').val();
        var nama_produk = $(this).find('input.product_name').val();
        var jumlah_produk = $(this).find('input.product_qty').val();
        var keterangan_produk = $(this).find('input.product_notes').val();
        var total_harga_barang = $(this).find('input.product_subtotal').val();

    });


}

/*
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
*/