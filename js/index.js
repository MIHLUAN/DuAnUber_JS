// 1.Nếu chưa nhập thông tin, click “Tính tiền”
// => show alert thông yêu cầu user nhập thông tin
// <-------------------------------->

var uberx = document.querySelector("#uberX");
var uberSUV = document.querySelector("#uberSUV");
var uberBlack = document.querySelector("#uberBlack");
var soKM = document.querySelector("#soKM");
var thoiGianCho = document.querySelector("#thoiGianCho");
var tinhTien = document.querySelector("#btnTinhTien");
var inHoaDon = document.querySelector("#inHoaDon");
function kiemTraNhapThongTin() {
  // Kiểm tra người dùng dã điền đầu đủ thoant in chưa?
  if (!uberx.checked && !uberSUV.checked && !uberBlack.checked)
    alert("Vui lòng chọn loại xe");
  else if (soKM.value === "") {
    alert("Vui lòng nhập vào số Km");
  } else if (thoiGianCho.value === "") {
    alert("Vui lòng nhập vào thời gian chờ");
  } else {
    document.querySelector("#divThanhTien").style.display = "block";
    document.querySelector("#xuatTien").innerHTML = Number(tinhTienTheoUber());
  }
}
// 2. Tinh tiền
// <-------------------------------->
function Uber() {
  this.tenUber = "";
  this.tien1KM = "";
  this.tien1_20KM = "";
  this.tienTren20KM = "";
  this.tienThoiGianCho = "";
  this.soKM = "";
  this.thoiGianCho = "";
  this.tinhTien = function () {
    var thanhTien = 0;
    if (this.soKM <= 1) {
      thanhTien = Number(this.soKM) * Number(this.tien1KM);
    } else if (this.soKM <= 20) {
      thanhTien = Number((this.soKM - 1) * this.tien1_20KM + this.tien1KM);
    } else {
      thanhTien = Number(
        (this.soKM - 20) * this.tienTren20KM +
          19 * this.tien1_20KM +
          this.tien1KM
      );
    }
    return thanhTien + Number(this.thoiGianCho) * Number(this.tienThoiGianCho);
  };
}
var uber = new Uber();
function tinhTienTheoUber() {
  if (uberx.checked) {
    uber.tenUber = "uberX";
    uber.tien1KM = 8000;
    uber.tien1_20KM = 12000;
    uber.tienTren20KM = 10000;
    uber.tienThoiGianCho = 2000;
    uber.soKM = soKM.value;
    uber.thoiGianCho = thoiGianCho.value;
  } else if (uberSUV.checked) {
    uber.tenUber = "uberSUV";
    uber.tien1KM = 9000;
    uber.tien1_20KM = 14000;
    uber.tienTren20KM = 12000;
    uber.tienThoiGianCho = 3000;
    uber.soKM = soKM.value;
    uber.thoiGianCho = thoiGianCho.value;
  } else if (uberBlack.checked) {
    uber.tenUber = "uberBlack";
    uber.tien1KM = 10000;
    uber.tien1_20KM = 16000;
    uber.tienTren20KM = 14000;
    uber.tienThoiGianCho = 4000;
    uber.soKM = soKM.value;
    uber.thoiGianCho = thoiGianCho.value;
  }
  return Number(uber.tinhTien()).toFixed(2);
}
// 3. In hoa đơn
// <-------------------------------->
document.querySelector("#btnInHoaDon").onclick = function () {
  kiemTraNhapThongTin();
  var contentHTML = ` 
    <table class="w-100">
        <tr class="w-100 mx-4" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <th class="w-25">Chi tiết</th>
            <th class="w-25">Sử dụng</th>
            <th class="w-25">Đơn giá</th>
            <th class="w-25">Thành Tiền</th>
        </tr> 
    `;
  if (uber.soKM >= 0 && uber.soKM <= 1) {
    contentHTML += `
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>${uber.soKM} km</td>
            <td>${uber.tien1KM}</td>
            <td>${uber.tien1KM * uber.soKM}</td>
        </tr>
        `;
  } else if (uber.soKM <= 20) {
    contentHTML += `
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>1 km</td>
            <td>${uber.tien1KM}</td>
            <td>${uber.tien1KM * 1}</td>
        </tr>
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>${uber.soKM - 1} km</td>
            <td>${uber.tien1_20KM}</td>
            <td>${uber.tien1_20KM * (uber.soKM - 1)}</td>
        </tr>
        `;
  } else if (uber.soKM > 20) {
    contentHTML += `
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>1 km</td>
            <td>${uber.tien1KM}</td>
            <td>${uber.tien1KM * 1}</td>
        </tr>
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>19 km</td>
            <td>${uber.tien1_20KM}</td>
            <td>${uber.tien1_20KM * 19}</td>
        </tr>
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>${uber.tenUber}</td>
            <td>${uber.soKM - 20} km</td>
            <td>${uber.tienTren20KM}</td>
            <td>${uber.tienTren20KM * (uber.soKM - 20)}</td>
        </tr>
        `;
  }

  contentHTML += ` 
        <tr class="mt-5" style="height: 50px; border-top: 1px solid rgb(170, 169, 169);">
            <td>Thời Gian Chờ</td>
            <td>${uber.thoiGianCho} Phút</td>
            <td>${uber.tienThoiGianCho}</td>
            <td>${uber.thoiGianCho * uber.tienThoiGianCho}</td>
        </tr>
        <tr class="mt-5" style="height: 50px;color:green;background: rgb(124, 223, 223);  " >
            <td>Total</td>
            <td></td>
            <td></td>
            <td style="color:green">${uber.tinhTien()}</td>
        </tr>
    </table>`;
  document.querySelector("#modal-body").innerHTML = contentHTML;
};

// 2. Tinh tiền
// <-------------------------------->
// var divThanhTien=document.querySelector('#divThanhTien');
// var xuatTien=document.querySelector('#xuatTien');
// function layLoaiXe(){
//     if(uberx.checked){
//         return 'uberX';
//     }
//     else if(uberSUV.checked){
//         return 'uberSUV';
//     }
//     else if(uberBlack.checked){
//         return 'uberBlack';
//     }
// }
// function tinhTienTheoUber(loaiXe,soKM,thoiGianCho){
//     var thanhTien=0;
//    switch(loaiXe){

//     case 'uberX':
//         if(soKM<=1){
//             thanhTien= Number(soKM*8000) ;
//         } else if(soKM<=20){
//             thanhTien= Number((soKM-1)*12000+8000);
//         } else{
//             thanhTien= Number((soKM-20)*10000+19*12000+8000);
//         }
//         return thanhTien+Number(thoiGianCho*2000) ;
//         break;
//      case 'uberSUV':
//         if(soKM<=1){
//             thanhTien= Number(soKM*9000) ;
//         } else if(soKM<=20){
//             thanhTien= Number((soKM-1)*14000+9000);
//         } else{
//             thanhTien= Number((soKM-20)*12000+19*14000+9000);
//         }
//         return thanhTien+Number(thoiGianCho*3000) ;
//         break;
//     case 'uberBlack':
//         if(soKM<=1){
//             thanhTien= Number(soKM*10000);
//         } else if(soKM<=20){
//             thanhTien= Number((soKM-1)*16000+10000);
//         } else{
//             thanhTien= Number((soKM-20)*14000+19*16000+10000);
//         }
//         return thanhTien+Number(thoiGianCho*4000) ;
//         break;
//    }

// }
