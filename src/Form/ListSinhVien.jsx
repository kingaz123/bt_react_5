import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteCreator,
  editCreator,
  searchCreator,
} from "../Redux/reducers/action";

class ListSinhVien extends Component {
  renderSinhvien = () => {
    let mangSVRender = this.props.mangSVSearch.length
      ? this.props.mangSVSearch
      : this.props.mangSV;
    return mangSVRender.map((sv, index) => {
      return (
        <tr key={index}>
          <td>{sv.maSV}</td>
          <td>{sv.hoTen}</td>
          <td>{sv.sdt}</td>
          <td>{sv.email}</td>
          <td>
            <button
              onClick={() => {
                let action = editCreator(sv);
                this.props.dispatch(action);
              }}
              className="btn btn-info mr-3"
            >
              Sửa
            </button>
            <button
              onClick={() => {
                let action = deleteCreator(sv);
                this.props.dispatch(action);
              }}
              className="btn btn-danger"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container mt-3">
        <form
          onChange={(event) => {
            let action = searchCreator(event.target.value);
            this.props.dispatch(action);
          }}
          style={{ marginLeft: "40%" }}
          className="form-inline mb-3"
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Tên sinh viên"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >
            Tìm
          </button>
        </form>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã sinh viên</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderSinhvien()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.reactFormReducer.mangSV,
    mangSVSearch: rootReducer.reactFormReducer.mangSVTK,
  };
};

export default connect(mapStateToProps)(ListSinhVien);
