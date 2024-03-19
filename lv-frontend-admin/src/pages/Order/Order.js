import { Table, Button, Select } from 'antd';
import './Order.scss';
function Order() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'MÃ ĐH',
            dataIndex: 'key',
        },
        {
            title: 'TÊN KHÁCH',
            dataIndex: 'ND_ten',
        },
        {
            title: 'ĐỊA CHỈ',
            dataIndex: 'ND_diaChi',
        },
        {
            title: 'SĐT',
            dataIndex: 'ND_soDienThoai',
        },
        {
            title: 'NGÀY ĐẶT',
            dataIndex: 'DH_ngayDat',
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'state',
            render: (text, record) => (
                <Select
                    defaultValue={record.state}
                    style={{
                        width: 150
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'Chờ xác nhận',
                            label: 'Chờ xác nhận',
                        },
                        {
                            value: 'Đang chuẩn bị',
                            label: 'Đang chẩn bị',
                        },
                        {
                            value: 'Đang vận chuyển',
                            label: 'Đang vận chuyển',
                        },
                        {
                            value: 'Đã giao hàng',
                            label: 'Đã giao hàng',

                        },
                    ]}
                />
            ),
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: 'Chờ xác nhận',
                },
                {
                    text: 'Đang chuẩn bị',
                    value: 'Đang chuẩn bị',
                },
                {
                    text: 'Đang vận chuyển',
                    value: 'Đang vận chuyển',
                },
                {
                    text: 'Đã giao',
                    value: 'Đã giao hàng',
                },

            ],
            filterSearch: true,
            onFilter: (value, record) => record.state === value,
        },
        {
            title: 'VOUCHER',
            dataIndex: 'voucher',
            render: (text, record) => (
                <div className={record.voucher ? 'received-voucher' : ''}>
                    {record.voucher ? <span style={{ color: '#333' }}>Đã tặng voucher</span> : ''}
                </div>
            ),
            filters: [
                {
                    text: 'Đã tặng voucher',
                    value: true,
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.voucher === value,
        },


        {
            title: '',
            dataIndex: '',
            render: (text, record) => (
                <div style={{ textAlign: 'right' }}> <Button>Xem hóa đơn</Button>

                </div>


            ),
        },

    ]

    const data = [
        {
            key: 1,
            index: 1,
            ND_ten: 'Dương Anh Thư',
            ND_diaChi: 'ấp Phước Bình - xã Mỹ Thuận - huyện  Mỹ Tú - tỉnh Sóc Trăng',
            ND_soDienThoai: '0358184035',
            DH_ngayDat: '05/03/2002',
            state: 'Đang chuẩn bị',
            voucher: true // Example voucher status
        },
        {
            key: 2,
            index: 2,
            ND_ten: 'Nguyễn Văn A',
            ND_diaChi: 'ấp Phước Bình - xã Mỹ Thuận - huyện  Mỹ Tú - tỉnh Sóc Trăng',
            ND_soDienThoai: '0358184035',
            DH_ngayDat: '05/03/2002',
            state: 'Đang vận chuyển',
            voucher: false // Example voucher status
        },
    ];
    return (
        <div className="container-order">
            <div className="text-center title-primary pb-4">Quản lý đơn hàng</div>
            <Table columns={columns} dataSource={data} />

        </div>
    )
}
export default Order;