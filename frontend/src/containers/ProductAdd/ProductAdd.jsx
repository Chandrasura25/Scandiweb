import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./ProductAdd.scss";
const ProductAdd = () => {
  const bookBx = useRef();
  const [selected, setSelected] = useState(null);
  const [selectClass, setSelectClass] = useState(null);

  useEffect(() => {
    setSelectClass(() => bookBx.current);
  }, []);

  if (selected) {
    const children = selectClass.querySelectorAll(".Book, .DVD, .Furniture");
    children.forEach((child) => {
      if (child.classList.contains(selected)) {
        child.style.display = "block";
      } else {
        child.style.display = "none";
      }
    });
  }
  const formik = useFormik({
    initialValues: {
      sku: "",
      name: "",
      price: "",
      productType: "",
    },
    onReset: (values) => {
      console.log(values);
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (values.sku === "") {
        errors.sku = "This field is required";
      }
      if (values.name === "") {
        errors.name = "This field is required";
      }
      if (values.price === "") {
        errors.price = "This field is required";
      }
      if (values.productType === "") {
        errors.productType = "This field is required";
      }
      return errors;
    },
  });
  console.log(formik.errors);

  return (
    <div className="container">
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <p>Product Add</p>
        </div>
        <ul className="pro__navbar-links">
          <li className="app__flex p-text">
            <button>Save</button>
          </li>
          <li className="app__flex p-text">
            <button>Cancel</button>
          </li>
        </ul>
      </nav>

      <div className="pro__form-container app__flex">
        <form onSubmit={formik.handleSubmit} className="pro__form">
          <div className="pro__form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              name="sku"
              id="sku"
              className={
                formik.errors.sku && formik.touched.sku ? "is-invalid" : ""
              }
              value={formik.values.sku}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.sku && (
              <span className="text-danger">{formik.errors.sku}</span>
            )}
          </div>
          <div className="pro__form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.name && formik.touched.name ? "is-invalid" : ""
              }
              value={formik.values.name}
            />
            {formik.touched.name && (
              <span className="text-danger">{formik.errors.name}</span>
            )}
          </div>
          <div className="pro__form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.price && formik.touched.price ? "is-invalid" : ""
              }
              value={formik.values.price}
            />
            {formik.touched.price && (
              <span className="text-danger">{formik.errors.price}</span>
            )}
          </div>
          <div className="pro__form-group">
            <label htmlFor="productType">Type Switcher</label>
            <select
              name="productType"
              id="productType"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setSelected(e.target.value);
                formik.handleChange(e);
              }}
              className={
                formik.errors.productType && formik.touched.productType ? "is-invalid" : ""
              }
              value={formik.values.productType}
            >
              <option value="" selected disabled>
                Type Switcher
              </option>
              <option value="Book">Book</option>
              <option value="DVD">DVD</option>
              <option value="Furniture">Furniture</option>
            </select>
            {formik.touched.productType && (
              <span className="text-danger">{formik.errors.productType}</span>
            )}
          </div>
          <div className="bx" ref={bookBx}>
            <div className="Book" style={{ display: "none" }}>
              <div className="pro__form-group">
                <label htmlFor="weight">Weight</label>
                <input required type="number" id="weight" name="weight" />
              </div>
            </div>
            <div className="DVD" style={{ display: "none" }}>
              <div className="pro__form-group">
                <label htmlFor="size">Size</label>
                <input required name="size" type="number" id="size" />
              </div>
            </div>
            <div className="Furniture" style={{ display: "none" }}>
              <div className="pro__form-group">
                <label htmlFor="height">Height</label>
                <input required type="number" id="height" name="height" />
              </div>
              <div className="pro__form-group">
                <label htmlFor="width"> Width</label>
                <input required type="number" id="width" name="width" />
              </div>
              <div className="pro__form-group">
                <label htmlFor="length">Length</label>
                <input required type="number" id="length" name="length" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
