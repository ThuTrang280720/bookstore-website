import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import axiosClient from "../../../../api/ClientAxiosApi";
import "./categorieslist.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withLoading from "../../../../utils/loading/withLoading";
import { DeleteForever, Edit } from "@mui/icons-material";
import dateFormat from "dateformat";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));
const customStyles2 = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    border: "none",
    zIndex: "999",
  },
  content: {
    top: "375px",
    overflow: "unset",
    border: "none",
    background: "transparent",
    height: "auto",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CategoriesList(props) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoriesApi.categories;
  const [callback, setCallback] = state.categoriesApi.callback;
  const [allProducts] = state.productsApiAdmin.allProducts;
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      closeModal();
      props.showLoading();
      if (onEdit) {
        const result = await axiosClient.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(result.data.msg);
      } else {
        const result = await axiosClient.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success(result.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    props.hideLoading();
  };
  const handleOpenCreateCate = () => {
    setCategory("");
    setOnEdit(false);
    openModal();
  };
  const editCategory = async (id, name) => {
    openModal();
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id, name) => {
    try {
      props.showLoading();
      if (
        window.confirm(`Are you sure about action delete category: ${name}`)
      ) {
        const result = await axiosClient.delete(`/api/category/${id}`, {
          headers: { Authorization: token },
        });
        toast.success(result.data.msg);
        setOnEdit(false);
        setCategory("");
        setCallback(!callback);
      }
      setOnEdit(false);
      setCategory("");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    props.hideLoading();
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f000";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {/* <div className="categories">
        <div className="categories-create">
          <form onSubmit={createCategory}>
            <label htmlFor="category">Category Management</label>
            <input
              type="text"
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />

            <button type="submit">{onEdit ? "Update" : "Save"}</button>
          </form>
        </div>

        <div className="categories-info">
          <div className="col">
            {categories.map((category) => (
              <div className="row" key={category._id}>
                <p>{category.name}</p>
                <div>
                  <Edit
                    onClick={() => editCategory(category._id, category.name)}
                  />

                  <DeleteForever
                    onClick={() => deleteCategory(category._id, category.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="categoriesList">
        <div className="categoriesListTitle">
          <h4>System have {categories.length} categories</h4>
          <div className="create-category">
            <button
              className="btn-create-category"
              onClick={handleOpenCreateCate}
            >
              Create Cate
            </button>
          </div>
        </div>
        <div className="categories-list">
          <table className="categories-listCategories">
            <thead>
              <tr>
                <th>CateID</th>
                <th>CateName</th>
                <th>Includes</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    (
                    {
                      allProducts.filter(
                        (cate) => cate.category === category.name
                      ).length
                    }
                    ) Books
                  </td>
                  <td>{dateFormat(category.createdAt)}</td>
                  <td>
                    {/* <Link to="#!" onClick={() => showMoreOrder(order._id)}>
                    Show more
                  </Link> */}
                    <Edit
                      onClick={() => editCategory(category._id, category.name)}
                    />
                    <DeleteForever
                      onClick={() =>
                        deleteCategory(category._id, category.name)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-category-modal">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles2}
          //portalClassName="modal"
          contentLabel="Example Modal"
        >
          <button className="btnclose-modal" onClick={closeModal}>
            X
          </button>
          <div className="categories-create">
            <form onSubmit={createCategory}>
              <label htmlFor="category">Category Management</label>
              <input
                type="text"
                name="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />

              <button type="submit">{onEdit ? "Update" : "Save"}</button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default withLoading(CategoriesList);
