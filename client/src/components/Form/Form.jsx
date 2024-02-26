import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBreed } from '../../actions';
import Header from '../Header/Header.jsx';
import styles from './Form.module.css';

export default function Form() {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    image: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    minLifeSpan: '',
    maxLifeSpan: '',
    temperaments: [],
    created: false,
  });
  const [errors, setErrors] = useState({});
  const [selectValue, setSelectValue] = useState('');

  // Handler functions
  function handleTemps(e) {
    if (input.temperaments.length < 4) {
      let concat = input[e.target.name].concat(e.target.value);
      setInput({
        ...input,
        [e.target.name]: concat,
      });
      setSelectValue('');
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
      }),
    );
  }
  function validation(input) {
    var errors = {};
    // Name
    var namePattern = /^[a-z ]+$/g;
    if (!input.name) errors.name = 'El nombre no puede estar vacio!';
    else if (!namePattern.test(input.name)) {
      errors.name = 'Para el nombre se deben usar unicamente minusculas';
    }

    // Image
    var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!input.image)
      errors.image = 'La imagen de la raza no puede estar vacia';
    else if (!imgPattern.test(input.image))
      errors.image = 'El link no es valido!';

    // Height (Altura)
    if (!input.minHeight) errors.minHeight = 'Debe existir una altura minima';
    else if (input.minHeight <= 0)
      errors.minHeight = 'La altura minima debe ser mas que 0';
    else if (input.maxHeight) {
      if (
        input.maxHeight &&
        parseInt(input.minHeight) > parseInt(input.maxHeight)
      )
        errors.minHeight = 'La altura minima no debe ser mayor al maximo';
      else if (input.maxHeight <= 0)
        errors.maxHeight = 'La altura maxima debe ser mas que 0';
    }

    // Weight (Peso)
    if (!input.minWeight) errors.minWeight = 'Debe existir un peso minimo';
    else if (input.minWeight <= 0)
      errors.minWeight = 'El peso minimo debe ser mas que 0';
    else if (input.maxWeight) {
      if (
        input.maxWeight &&
        parseInt(input.minWeight) > parseInt(input.maxWeight)
      )
        errors.minWeight = 'El peso minimo no debe ser mayor al maximo';
      else if (input.maxWeight <= 0)
        errors.maxWeight = 'El peso maximo debe ser mas que 0';
    }

    // Life Span (Esperanza de vida)
    if (!input.minLifeSpan)
      errors.minLifeSpan = 'La esperanza de vida no puede estar vacia';
    else if (input.minLifeSpan <= 0) errors.minLifeSpan = 'Debe ser mayor a 0';
    else if (input.maxLifeSpan) {
      if (parseInt(input.minLifemaxLifeSpan) > parseInt(input.maxLifeSpan))
        errors.minLifeSpan =
          'La esperanza de vida minima no puede ser mayor a la maxima';
      else if (input.maxLifeSpan <= 0)
        errors.maxLifeSpan = 'Debe ser mayor a 0';
    }
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
        name: '',
        image: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifeSpan: '',
        maxLifeSpan: '',
        temperaments: [],
        created: true,
      });
    } else {
      alert('La informacion de la raza no puede estar vacia!');
    }
  }

  return (
    <>
      <Header />
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>Estas creando una raza</h1>
        <div className={styles.inputdiv}>
          <input
            onChange={handleInputChange}
            name="name"
            type="text"
            placeholder="Nombre"
            value={input.name}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.inputdiv}>
          <input
            onChange={handleInputChange}
            name="image"
            type="text"
            placeholder="Imagen"
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
              min={0}
              placeholder="Altura Min."
              value={input.minHeight}
            />
            <input
              onChange={handleInputChange}
              name="maxHeight"
              type="number"
              min={0}
              placeholder="Altura Max."
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
              min={0}
              placeholder="Peso Min."
              value={input.minWeight}
            />
            <input
              onChange={handleInputChange}
              name="maxWeight"
              type="number"
              min={0}
              placeholder="Peso Max."
              value={input.maxWeight}
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
              min={0}
              placeholder="Min. Esperanza de vida"
              value={input.minLifeSpan}
            />
            <input
              onChange={handleInputChange}
              name="maxLifeSpan"
              type="number"
              min={0}
              placeholder="Max. Esperanza de vida"
              value={input.maxLifeSpan}
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
          value={selectValue}
        >
          <option value="">- Elige uno o varios temperamentos -</option>
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

        {input.created ? (
          <div className={styles.success}>
            <span>Raza creada correctamente!</span>
          </div>
        ) : null}

        {Object.keys(errors).length === 0 ? (
          <button className={styles.button}>Crear raza!</button>
        ) : (
          <button
            disabled={Object.keys(errors).length === 0 ? '' : true}
            className={styles.buttonDisabled}
          >
            &#128711;
          </button>
        )}
      </form>
      {/* <Footer /> */}
    </>
  );
}
