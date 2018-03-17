// ==UserScript==
// @name         Tokopedia Cetak Sekaligus
// @author       Rendi Wahyudi Muliawan (Celleven Store)
// @namespace    http://www.tokopedia.com/celleven
// @version      0.02
// @description  Untuk mencetak label alamat pada Tokopedia bagi pengguna Non / Bukan Gold Merchant.
// @match        https://www.tokopedia.com/myshop_order_process.pl
// @match        https://tokopedia.com/myshop_order_process.pl
// @include      https://www.tokopedia.com/myshop_order_process.pl
// @include      https://tokopedia.com/myshop_order_process.pl
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @updateURL    https://github.com/rendy1287/tokopedia-cetak-sekaligus/raw/master/tokopedia.user.js
// @downloadURL  https://github.com/rendy1287/tokopedia-cetak-sekaligus/raw/master/tokopedia.user.js
// @run-at       document-end
// ==/UserScript==

//***************** PENGATURAN *************************************//
//
// @logokamu      URL logo toko jika kamu ingin cantumkan logo
//                isikan url image kamu, bisa upload ke image hosting
//                logo recommended size: 115x25 pixel
//
// @logoekspedisi menampilkan logo ekspedisi
//                isikan true jika ingin menampilkan atau false jika tidak
//
// @invoice       menampilkan nomor invoice
//                isikan true jika ingin menampilkan atau false jika tidak
//
// @fontsize      ukuran font untuk label
//
//******************************************************************//

var logokamu = '';
var logoekspedisi = 0;
var invoice = 0;
var fontsize = '15px';

//*****************************************************************//

(function() {
    'use strict';

	alert($('input.customer_name')); // tes

})();