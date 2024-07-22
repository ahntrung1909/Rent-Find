import React from "react";
import "./policy.scss";

export default function Policy() {
    return (
        <div className="container-policy">
            <div className="about-page">
                <h1 style={{ marginBottom: 20 }}>Chính sách và Bảo mật</h1>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Trách nhiệm bảo vệ thông tin cá nhân của người tiêu dùng.
                </h2>
                <p>
                    - Trong quá trình hoạt động kinh doanh thương mại điện tử,
                    nếu Rent Find thực hiện việc thu thập thông tin cá nhân của
                    người tiêu dùng thì sẽ đảm bảo tuân thủ các quy định tại
                    Nghị định 72/2013/NĐ-CP và những quy định pháp luật liên
                    quan về bảo vệ thông tin cá nhân.
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Về những thông tin liên quan đến người dùng
                </h2>
                <p>
                    - Trạng thái tài khoản sẽ được bộ phận kiểm duyệt của Rent
                    Find đánh giá với 4 mức độ: <br></br>+ Tốt. <br></br>+ Bình
                    thường. <br></br>+ Cảnh cáo.<br></br>+ Cấm.
                </p>
                <p>
                    Với mỗi mức độ như trên, người dùng có thể biết được độ hoàn
                    thành hợp đồng, độ uy tín của người dùng khác để cảnh giác
                    với những hành vi lừa đảo đáng tiếc xảy ra.
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Trạng thái tài khoản ảnh hưởng như thế nào đến người dùng?
                </h2>
                <p>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        {" "}
                        - "Tốt":
                    </span>{" "}
                    <br></br>Người dùng sẽ có toàn quyền sử dụng những chức năng
                    trên trang web, theo đó là độ uy tín cho việc hoàn thành hợp
                    đồng giao dịch cho thuê trọ. <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        - "Bình thường":
                    </span>
                    <br></br>
                    Người dùng sẽ có toàn quyền sử dụng những chức năng trên
                    website, nhưng tài khoản này chưa hoàn thành tối thiểu 3
                    giao dịch cho thuê trọ. <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        - "Cảnh cáo":
                    </span>
                    <br></br>
                    Người dùng sẽ có toàn quyền sử dụng những chức năng trên
                    trang web, nhưng những người dùng khác sẽ thận trọng hơn khi
                    thấy tài khoản này vì trong quá khứ tài khoản đã từng vi
                    phạm tiêu chuẩn cộng đồng của Rent Find. <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        {" "}
                        - "Cấm":
                    </span>{" "}
                    <br></br>Trong trường hợp người dùng bị "Cảnh cáo" 3 lần trở
                    lên, người dùng sẽ không được sử dụng chức năng trên
                    website, bị cấm khỏi nền tảng.
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Tăng độ uy tín cho tài khoản
                </h2>
                <p>
                    Để tăng độ uy tín cho tài khoản, người dùng sẽ phải làm như
                    sau: <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        - "Bình thường" → "Tốt":
                    </span>{" "}
                    <br />
                    Người dùng sẽ phải hoàn thành 3 giao dịch và liên hệ với bộ
                    phận CSKH để được xét duyệt. <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        - "Cảnh cáo" → "Bình thường":
                    </span>{" "}
                    <br />
                    Người dùng sẽ phải hoàn thành 6 giao dịch và liên hệ với bộ
                    phận CSKH để được xét duyệt. Trong thời gian bị cảnh cáo mà
                    người dùng vẫn tái phạm thì số lần hoàn thành giao dịch sẽ
                    bị reset lại, hệ thống sẽ ghi thêm 1 lần nữa bị cảnh cáo
                    <br></br>
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        - "Cấm" → "Bình thường":
                    </span>{" "}
                    <br />
                    Người dùng sẽ phải liên hệ với bộ phận CSKH để được gỡ bỏ,
                    đưa ra cam kết để đảm bảo rằng sẽ không vi phạm, ảnh hưởng
                    đến cộng đồng người dùng.
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Người dùng cần làm gì sau khi đã hoàn thành việc thuê - cho
                    thuê nhà
                </h2>
                <p>
                    Người dùng sẽ phải ẩn bài viết khỏi trang chủ sau khi hoàn
                    thành mục đích của bài viết.<br></br> Bài viết sẽ được lưu
                    vào mục{" "}
                    <span style={{ lineHeight: 2.5, fontWeight: "bold" }}>
                        "Bài viết đã ẩn"
                    </span>
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa
                    dữ liệu cá nhân của mình
                </h2>
                <p>
                    - Các thành viên có một tài khoản bao gồm user và password
                    để truy cập Rent Find. Sau khi đăng nhập, thành viên có
                    quyền sử dụng mọi dịch vụ/tiện ích được cung cấp trên
                    website theo đúng chức năng, quyền hạn được phân cấp. Thành
                    viên có thể tự chỉnh sửa thông tin cá nhân trong tài khoản
                    của mình. <br></br>- Người kiểm duyệt sẽ không được tự ý
                    chỉnh sửa thông tin của người dùng ngoại trừ "Trạng thái tài
                    khoản"
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Lưu ý khi đăng bài viết
                </h2>
                <p>
                    - Người dùng phải đưa ra thông tin chính xác như Tiêu đề, Mô
                    tả, Địa chỉ, Giá tiền,... <br></br>- Trong Mô tả, người dùng
                    phải mô tả rõ về thực trạng, chi tiết cũng như yêu cầu của
                    nơi thuê - cho thuê <br></br>- Người dùng phải đăng ít nhất
                    3 ảnh chi tiết nơi nhà trọ <br></br>→ Khi đáp ứng những yêu
                    cầu trên, người kiểm duyệt sẽ duyệt bài cho người dùng.
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Cách thức duyệt đơn tố cáo
                </h2>
                <p>
                    - Người kiểm duyệt tiếp nhận đơn tố cáo từ hệ thống khi
                    người dùng gửi đến <br></br>- Người kiểm duyệt sẽ xem Lý do
                    tố cáo và Ảnh đính kèm nếu có - Sau đó người kiểm duyệt sẽ
                    xem xét đơn tố cáo đúng hay không, từ đó gửi phản hồi:{" "}
                    <br></br>
                    <span style={{ fontWeight: "bold" }}>
                        {" "}
                        + Nếu thành công
                    </span>
                    , gửi mail đến cho người bị tố cáo tùy theo mức độ Cảnh cáo
                    hay Cấm <br></br>
                    <span style={{ fontWeight: "bold" }}> + Nếu thất bại</span>,
                    gửi mail đến cho người tố cáo và ghi lý do tại sao đơn tố
                    cáo không được duyệt
                </p>
                <h2
                    style={{
                        textAlign: "left",
                        fontSize: 18,
                        textDecoration: "underline",
                    }}
                >
                    Cam kết bảo mật thông tin cá nhân khách hàng:
                </h2>
                <p>
                    Thông tin cá nhân của thành viên trên Rent Find được cam kết
                    bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân
                    của Rent Find. <br />
                    Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ
                    được thực hiện khi có sự đồng ý của khách hàng đó trừ những
                    trường hợp pháp luật có quy định khác. <br />
                    Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho
                    bên thứ 3 nào về thông tin cá nhân của thành viên khi không
                    có sự cho phép đồng ý từ thành viên
                </p>
                <h2>
                    ***Tuyệt đối nghiêm cấm mọi hành vi lừa đảo, chiếm đoạt tài
                    sản***
                </h2>
                <p>
                    Nếu bị phát hiện hoặc bị tố cáo, người dùng đó sẽ bị cấm
                    vĩnh viễn khỏi Rent Find!
                </p>
                <p>
                    Website ra đời sẽ góp phần giải quyết được các vấn đề thuê
                    trọ hiện nay, và giúp mọi người tìm kiếm nhà trọ, chỗ ở phù
                    hợp và dễ dàng. Hy vọng Rent Find sẽ là địa chỉ quen thuộc
                    cho mọi người.
                </p>
            </div>
        </div>
    );
}
