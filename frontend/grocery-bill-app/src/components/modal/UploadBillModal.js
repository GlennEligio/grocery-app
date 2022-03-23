import React, { useEffect, useState, useRef } from "react";
import ItemService from "../../api/ItemService";
import { connect } from "react-redux";
import fileDownload from "js-file-download";
import BillService from "../../api/BillService";

const UploadBillModal = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [overwrite, setOverwrite] = useState(false);
  const form = useRef();
  const fileInput = useRef();
  const modal = useRef();

  useEffect(() => {
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function (e) {
        setLoading(false);
        setError(false);
        setStatus(false);
        form.current.reset();
        form.current.classList.remove("was-validated");
      });
    }
  }, [modal]);

  const handleSubmit = (e) => {
    setLoading(true);
    setError(false);
    setStatus(false);
    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
    } else {
      let formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      formData.append("overwrite", overwrite);
      BillService.upload(user.jwt, formData)
        .then((res) => {
          switch (res.status) {
            case 200:
              setLoading(false);
              setStatus(true);
              form.current.classList.remove("was-validated");
              break;
            default:
              setLoading(false);
              setError(true);
              form.current.classList.add("was-validated");
          }
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          form.current.classList.add("was-validated");
        });
    }
  };

  return (
    <div
      ref={modal}
      className="modal fade"
      id="uploadBillModal"
      tabIndex="-1"
      aria-labelledby="uploadBillModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="uploadBillModalLabel">
              Upload Item
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-2">
              {loading && (
                <div className="hstack align-items-center justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Uploading bills...</span>
                  </div>
                  <strong className="ms-2">Uploading bills...</strong>
                </div>
              )}
              {error && (
                <div className="hstack align-items-center justify-content-center text-danger">
                  <i className="bi bi-x-circle-fill fs-3"></i>
                  <strong className="ms-2">Something went wrong....</strong>
                </div>
              )}
              {status && (
                <div className="hstack align-items-center justify-content-center text-success">
                  <i className="bi bi-check-circle-fill fs-3"></i>
                  <strong className="ms-2">Upload Bills Success</strong>
                </div>
              )}
            </div>
            <div>
              <ul className="list-unstyled">
                <li>
                  1. Download the template file
                  <a
                    className="ms-1"
                    onClick={() =>
                      BillService.downloadTemplate(user.jwt)
                        .then((res) => res.blob())
                        .then((data) =>
                          fileDownload(data, "bills-template.xlsx")
                        )
                        .catch((error) => console.log(error))
                    }
                  >
                    here
                  </a>
                </li>
                <li>2. Don't leave blank rows or columns</li>
              </ul>
            </div>
            <form ref={form} onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <input
                  ref={fileInput}
                  type="file"
                  className="form-control"
                  id="uploadBillFile"
                  aria-describedby="uploadBillFile"
                  aria-label="Upload Bill"
                  required
                />
                <button className="btn btn-success" type="submit">
                  Upload
                </button>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={overwrite}
                  onChange={(e) => setOverwrite(e.currentTarget.checked)}
                  id="uploadBillOverwrite"
                />
                <label
                  className="form-check-label"
                  htmlFor="uploadBillOverwrite"
                >
                  Overwrite?
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(UploadBillModal);
