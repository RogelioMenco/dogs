import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreed } from "../../actions";
import Footer from "../Footer/Footer";
import Header from "../Header/Header.jsx";
import styles from "./Form.module.css";

export default function Form() {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: [],
    created: false,
  });
  const [errors, setErrors] = useState({});

  // Handler functions
  function handleTemps(e) {
    if (input.temperaments.length < 4) {
      let concat = input[e.target.name].concat(e.target.value);
      setInput({
        ...input,
        [e.target.name]: concat,
      });
    }
  }
  function remove(e) {
    let toDelete = e.target.innerText;
    setInput({
      ...input,
      temperaments: input.temperaments.filter((e) => e !== toDelete),
    });
  }
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      created: false,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function validation(input) {
    var errors = {};
    // Name
    var namePattern = /^[a-z ]+$/g;
    if (!input.name) errors.name = "Name can't be blank";
    else if (!namePattern.test(input.name)) {
      errors.name = "Only lowercase letters allowed";
    }
    // Image
    var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!input.image) errors.image = "Image link can't be blank";
    else if (!imgPattern.test(input.image))
      errors.image = "Must be a image link";
    // Height
    if (!input.minHeight) errors.minHeight = "Min Height can't be blank";
    else if (input.minHeight <= 0) errors.minHeight = "Must be above zero";
    else if (input.maxHeight) {
      if (parseInt(input.minHeight) > parseInt(input.maxHeight))
        errors.minHeight = "Min Height can't be greater than Max Height";
    }
    if (!input.maxHeight) errors.maxHeight = "Max Height can't be blank";
    else if (input.maxHeight <= 0) errors.maxHeight = "Must be above zero";
    // Weight
    if (!input.minWeight) errors.minWeight = "Min Weight can't be blank";
    else if (input.minWeight <= 0) errors.minWeight = "Must be above zero";
    else if (input.maxWeight) {
      if (parseInt(input.minWeight) > parseInt(input.maxWeight))
        errors.minWeight = "Min Weight can't be greater than Max Weight";
    }
    if (!input.maxWeight) errors.maxWeight = "Max Weight can't be blank";
    else if (input.maxWeight <= 0) errors.maxWeight = "Must be above zero";
    // Life Span
    if (!input.minLifeSpan) errors.minLifeSpan = "Min LifeSpan can't be blank";
    else if (input.minLifeSpan <= 0) errors.minLifeSpan = "Must be above zero";
    else if (input.maxLifeSpan) {
      if (parseInt(input.minLifemaxLifeSpan) > parseInt(input.maxLifeSpan))
        errors.minLifeSpan =
          "Min Life Span can't be greater than Max Life Span";
    }
    if (!input.maxLifeSpan) errors.maxLifeSpan = "Max LifeSpan can't be blank";
    else if (input.maxLifeSpan <= 0) errors.maxLifeSpan = "Must be above zero";
    return errors;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.name) {
      let dogToDispatch = {
        name: input.name,
        image: input.image,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        lifeSpan: `${input.minLifeSpan} - ${input.minLifeSpan}`,
        temps: input.temperaments,
      };

      dispatch(addBreed(dogToDispatch));
      setInput({
        name: "",
        image: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        temperaments: [],
        created: true,
      });
    } else {
      alert("You cannot create an empty breed!");
    }
  }

  return (
    <>
      <Header />
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.inputdiv}>
          <input
            onChange={handleInputChange}
            name="name"
            type="text"
            placeholder="Name"
            value={input.name}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.inputdiv}>
          <input
            onChange={handleInputChange}
            name="image"
            type="text"
            placeholder="Image"
            value={input.image}
          />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <div className={styles.inputdivhalf}>
          <div>
            <input
              onChange={handleInputChange}
              name="minHeight"
              type="number"
              placeholder="Min Height"
              value={input.minHeight}
            />
            <input
              onChange={handleInputChange}
              name="maxHeight"
              type="number"
              placeholder="Max Height"
              value={input.maxHeight}
            />
          </div>
          {errors.maxHeight && <span>{errors.maxHeight}</span>}
          {errors.minHeight && <span>{errors.minHeight}</span>}
        </div>

        <div className={styles.inputdivhalf}>
          <div>
            <input
              onChange={handleInputChange}
              name="minWeight"
              type="number"
              placeholder="Min Weight"
            />
            <input
              onChange={handleInputChange}
              name="maxWeight"
              type="number"
              placeholder="Max Weight"
            />
          </div>
          {errors.minWeight && <span>{errors.minWeight}</span>}
          {errors.maxWeight && <span>{errors.maxWeight}</span>}
        </div>

        <div className={styles.inputdivhalf}>
          <div>
            <input
              onChange={handleInputChange}
              name="minLifeSpan"
              type="number"
              placeholder="Min Life Span"
            />
            <input
              onChange={handleInputChange}
              name="maxLifeSpan"
              type="number"
              placeholder="Max Life Span"
            />
          </div>
          {errors.minLifeSpan && <span>{errors.minLifeSpan}</span>}
          {errors.maxLifeSpan && <span>{errors.maxLifeSpan}</span>}
        </div>

        {/* Temperaments Select  */}
        <select
          className={styles.select}
          onChange={handleTemps}
          name="temperaments"
          id="temperaments"
        >
          <option value="">-Choose one or more-</option>
          {temperaments.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <div className={styles.inputdiv}>
          <ul className={styles.ul}>
            {input.temperaments.length
              ? input.temperaments.map((e, i) => (
                  <li key={i} onClick={remove}>
                    {e}
                  </li>
                ))
              : null}
          </ul>
        </div>

        {Object.keys(errors).length === 0 ? (
          <button className={styles.button}>Create new breed!</button>
        ) : (
          <button
            disabled={Object.keys(errors).length === 0 ? "" : true}
            className={styles.buttonDisabled}
          >
            &#128711;
          </button>
        )}
        {input.created ? (
          <div className={styles.success}>
            <span>Breed created successfully!</span>
          </div>
        ) : null}
      </form>
      {/* <Footer /> */}
    </>
  );
}
