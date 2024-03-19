const queryMysql = require('../../database/mysql.js')
const cloudinary = require('../../service/cloundinary.js')

class ProductController {
    async createProduct(req, res) {
        try {
            const create_input_order = await queryMysql(`insert into HOADONNHAP(NCC_id,HDN_noiDung,HDN_tongTien,HDN_ngayNhap)value(
                ${req.body.id_supplier_selected},
                '${req.body.noiDung}',
                ${req.body.tongTien},
                '${req.body.dateNhap}'
            )`)
            const create_product = await queryMysql(`insert into sanpham(DMSP_id,SP_ten,SP_NSX,SP_HSD,SP_soLuong,SP_trongLuong,SP_donViTinh,SP_moTa)value(
                ${req.body.id_category_selected},
                '${req.body.name}',
                '${req.body.NSX}',
                '${req.body.HSD}',
                ${req.body.soLuong},
                ${req.body.trongLuong},
                '${req.body.donViTinh}',
                '${req.body.moTa}'
            )`)

            const create_price = await queryMysql(`insert into gia(SP_id,G_giaBanDau,G_thoiGia)value(
                ${create_product.insertId},
                ${req.body.giaBan},
                ${req.body.giaBan}
            )`)

            const detail = await queryMysql(`insert into chi_tiet_hdn(HDN_id,SP_id,CHI_TIET_HDN_soLuong)value(
                ${create_input_order.insertId},
                ${create_product.insertId},
                ${req.body.soLuong}
            )`)
            for (let base64 of req.body.file_images) {
                const response = await cloudinary.uploader.upload(base64)
                let result = await queryMysql(`insert into hinhanh(SP_id,HA_URL)value(${create_product.insertId},'${response.url}')`)
            }
            res.json(true)
        } catch (e) {
            console.error(e)
        }
    }

    async getAllProduct(req, res) {
        const products = await queryMysql(`SELECT * FROM soctrangspecial.sanpham as sp
            inner join soctrangspecial.gia as g on g.SP_id=sp.SP_id`)
        res.json(products)
    }
}

module.exports = new ProductController