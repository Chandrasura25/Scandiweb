import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
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
      weight: "",
      size: "",
      length: "",
      width: "",
      height: "",
    },
    onSubmit: (values) => {
      let given = {
        sku: "",
        name: "",
        price: "",
        productType: "",
      };
      for (let key in given) {
        if (given[key] === "") {
          // errors[key] = "This field is required";
        }
      }
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      let given = {
        sku: "",
        name: "",
        price: "",
        productType: "",
      };
      for (let key in given) {
        if (given[key] === "") {
          errors[key] = "This field is required";
        }
      }
      if (selected === "Furniture") {
        if (!values.height || !values.width || !values.length) {
          errors.productType = "This furniture is required";
        }
        let required = {
          length: "",
          width: "",
          height: "",
        };
        for (let key in required) {
          if (required[key] === "") {
            errors[key] = "This field is required";
          }
        }
      }
      if (selected === "Book") {
        if (!values.weight) {
          errors.productType = "This Book is required";
        }
        if (values.weight === "") {
          errors.weight = "This field is required";
        }
      }
      if (selected === "DVD") {
        if (!values.size) {
          errors.productType = "This DVD Size is required";
        }
        if (values.size === "") {
          errors.size = "This field is required";
        }
      }
      return errors;
    },
  });
  console.log(formik.errors);
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <nav className="app__navbar">
          <div className="app__navbar-logo">
            <p>Product Add</p>
          </div>
          <ul className="pro__navbar-links">
            <li className="app__flex p-text">
              <button type="submit">Save</button>
            </li>
            <li className="app__flex p-text">
              <button>Cancel</button>
            </li>
          </ul>
        </nav>

        <div className="pro__form-container app__flex">
          <div className="pro__form">
            {["sku", "name", "price"].map((fieldName) => (
              <div className="pro__form-group" key={fieldName}>
                <label htmlFor={fieldName}>{fieldName.toUpperCase()}</label>
                <input
                  type="text"
                  name={fieldName}
                  id={fieldName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors[fieldName] && formik.touched[fieldName]
                      ? "is-invalid"
                      : ""
                  }
                  value={formik.values[fieldName]}
                />
                {formik.touched[fieldName] && formik.errors[fieldName] && (
                  <span className="text-danger">
                    {formik.errors[fieldName]}
                  </span>
                )}
              </div>
            ))}
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
                  formik.errors.productType && formik.touched.productType
                    ? "is-invalid"
                    : ""
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
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.weight && formik.touched.weight
                        ? "is-invalid"
                        : ""
                    }
                    value={formik.values.weight}
                  />
                  {formik.touched.weight && (
                    <span className="text-danger">{formik.errors.weight}</span>
                  )}
                </div>
              </div>
              <div className="DVD" style={{ display: "none" }}>
                <div className="pro__form-group">
                  <label htmlFor="size">Size</label>
                  <input
                    name="size"
                    type="number"
                    id="size"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.size && formik.touched.size
                        ? "is-invalid"
                        : ""
                    }
                    value={formik.values.size}
                  />
                  {formik.touched.size && (
                    <span className="text-danger">{formik.errors.size}</span>
                  )}
                </div>
              </div>
              <div className="Furniture" style={{ display: "none" }}>
                {["height", "width", "length"].map((fieldName) => (
                  <div className="pro__form-group" key={fieldName}>
                    <label htmlFor={fieldName}>{fieldName.toUpperCase()}</label>
                    <input
                      type="text"
                      name={fieldName}
                      id={fieldName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors[fieldName] && formik.touched[fieldName]
                          ? "is-invalid"
                          : ""
                      }
                      value={formik.values[fieldName]}
                    />
                    {formik.touched[fieldName] && formik.errors[fieldName] && (
                      <span className="text-danger">
                        {formik.errors[fieldName]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
