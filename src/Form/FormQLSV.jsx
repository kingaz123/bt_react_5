import React, { Component } from "react";
import { connect } from "react-redux";
import { flushSync } from "react-dom";
import { submitCreator, updateCreator } from "../Redux/reducers/action";

class FormQLSV extends Component {
  state = {
    value: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    error: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    touch: {
      maSV: false,
      hoTen: false,
      sdt: false,
      email: false,
    },
  };
  handleValidate = () => {
    const newError = { ...this.state.error };
    const { value } = this.state;
    for (let prop in this.state.value) {
      // console.log("prop",{ prop });
      switch (prop) {
        case "maSV": {
          newError[prop] = "";
          //kiểm tra id đã tồn tại trong danh sách sinh viên sẵn có chưa, nếu có thì báo lỗi
          const isExist = this.props.mangSV.find(
            (sv) => +sv.maSV === Number(value[prop])
          );
          const isNotEdit = !this.props.studentEdit;

          if (isExist && isNotEdit) {
            newError[prop] = "Mã sinh viên đã tồn tại.";
          }

          //phải là số
          const REGEX_NUMBER = /^\d+$/;
          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Mã sinh viên là phải là số";
          }
          //không được bỏ trống
          if (value[prop].length === 0) {
            newError[prop] = "Thông tin không được để trống";
          }

          break;
        }
        case "hoTen": {
          newError[prop] = "";

          const REGEX_LETTER =
            /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
          //2. Họ tên phải là chữ
          if (!REGEX_LETTER.test(value[prop])) {
            newError[prop] =
              "Họ tên phải là chữ, không bao gồm số hoặc ký tự đặc biệt";
          }

          if (value[prop].length === 0) {
            //3. Không được bỏ trống
            newError[prop] = "Thông tin không được để trống";
          }
          break;
        }
        case "sdt": {
          newError[prop] = "";

          const REGEX_NUMBER = /^\d+$/;
          //Là dãy số từ 11 đến 11 chữ số
          if (!(value[prop].length >= 10 && value[prop].length <= 11)) {
            newError[prop] =
              "Số điện thoại phải là dãy số có 10 đến 11 chữ số ";
          }
          // phải là dãy số
          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Chỉ được nhập ký tự số";
          }

          if (value[prop].length === 0) {
            //không được bỏ trống
            newError[prop] = "Thông tin không được để trống";
          }
          break;
        }
        case "email": {
          newError[prop] = "";

          const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          //2. Phải đúng định dạng email
          if (!REGEX_EMAIL.test(value[prop])) {
            newError[prop] = "Định dạng Email không hợp lệ";
          }

          if (value[prop].length === 0) {
            //1. không được bỏ trống
            newError[prop] = "Thông tin không được để trống";
          }
          break;
        }
        default:
          break;
      }
    }
    this.setState({
      error: newError,
    });

    return newError;
  };
  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    // console.log(value, name);
    flushSync(() => {
      this.setState({
        value: {
          ...this.state.value,
          [name]: value,
        },
        touch: {
          ...this.state.touch,
          [name]: true,
        },
      });
    });
    this.handleValidate();
  };
  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true,
      },
    });
    this.handleValidate();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      touch: {
        maSV: true,
        hoTen: true,
        sdt: true,
        email: true,
      },
    });

    const newError = this.handleValidate();

    const ready = Object.values(newError).every((i) => i.length === 0);
    if (ready === false) return;

    const action = this.props.studentEdit
      ? updateCreator(this.state.value)
      : submitCreator(this.state.value);

    this.props.dispatch(action);

    this.setState({
      value: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      },
      touch: {
        maSV: false,
        hoTen: false,
        sdt: false,
        email: false,
      },
    });
  };
  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.studentEdit !== null) {
      if (newProps.studentEdit.maSV !== currentState.value.maSV)
        return {
          value: newProps.studentEdit,
        };
    }
    return null;
  }
  render() {
    return (
      <div className="container">
        <h3 className="bg-dark text-white p-2 mt-5">Thông tin sinh viên</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="maSV" className="form-label">
                Mã số
              </label>
              <input
                disabled={this.props.studentEdit}
                value={this.state.value.maSV}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name="maSV"
                type="text"
                id="maSV"
                className="form-control"
              />
              <div style={{ height: 30 }}>
                {this.state.touch.maSV && this.state.error.maSV && (
                  <p className="text-danger">{this.state.error.maSV}</p>
                )}
              </div>
            </div>
            <div className="form-group col-6">
              <label htmlFor="hoTen" className="form-label">
                Họ tên
              </label>
              <input
                value={this.state.value.hoTen}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name="hoTen"
                type="text"
                id="hoTen"
                className="form-control"
              />
              <div style={{ height: 30 }}>
                {this.state.touch.hoTen && this.state.error.hoTen && (
                  <p className="text-danger">{this.state.error.hoTen}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="sdt" className="form-label">
                Số điện thoại
              </label>
              <input
                value={this.state.value.sdt}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name="sdt"
                type="text"
                id="sdt"
                className="form-control"
              />
              <div style={{ height: 30 }}>
                {this.state.touch.sdt && this.state.error.sdt && (
                  <p className="text-danger">{this.state.error.sdt}</p>
                )}
              </div>
            </div>
            <div className="form-group col-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={this.state.value.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name="email"
                type="text"
                id="email"
                className="form-control"
              />
              <div style={{ height: 30 }}>
                {this.state.touch.email && this.state.error.email && (
                  <p className="text-danger">{this.state.error.email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-right">
              <button type="submit" className="btn btn-success">
                {this.props.studentEdit ? "Cập nhật" : "Thêm sinh viên"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.reactFormReducer.mangSV,
    studentEdit: rootReducer.reactFormReducer.studentEdit,
  };
};

export default connect(mapStateToProps)(FormQLSV);
