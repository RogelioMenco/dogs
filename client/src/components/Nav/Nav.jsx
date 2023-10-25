import React from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import {
  weightAndAlpha,
  searchBreed,
  filterTemp,
  filterOrigin,
} from "../../actions";
import styles from "./Nav.module.css";

function Nav() {
  const dispatch = useDispatch();

  const weightAndAlphaAction = function (option) {
    dispatch(weightAndAlpha(option));
  };
  const search = function (value) {
    !value ? dispatch(searchBreed("ALL")) : dispatch(searchBreed(value));
  };
  const filterTempAction = function (option) {
    dispatch(filterTemp(option));
  };
  const filterOrigins = async function (option) {
    dispatch(filterOrigin(option));
  };

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <span className={styles.title}>Dogs</span>
      </div>

      <div className={styles.filterorder}>
        <SearchBar
          weightAlpha={weightAndAlphaAction}
          search={search}
          filterTemp={filterTempAction}
          filterOrigin={filterOrigins}
        />
      </div>
    </div>
  );
}

export default Nav;