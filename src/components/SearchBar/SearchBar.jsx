import css from 'styles.module.css';
import { RiFindReplaceLine } from 'react-icons/ri';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handleSubmtit = e => {
    e.preventDefault();
    onSubmit(q);
    reset();
  };

  const handleChange = e => {
    setQ(e.target.value);
  };

  const reset = () => {
    setQ(null);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmtit}>
        <button type="submit" className={css.SearchFormButton}>
          <RiFindReplaceLine />

          <span className={css.SearchFormButtonLabel}></span>
        </button>

        <input
          required
          className={css.SearchFormInput}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

// export class SearchBar extends Component {
//   state = {
//     picture: '',
//   };

//   handleSubmtit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.picture);
//     this.reset();
//   };

//   handleChange = e => {
//     this.setState({ picture: e.target.value });
//   };

//   reset = () => {
//     this.setState({
//       picture: null,
//     });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmtit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <RiFindReplaceLine />

//             <span className={css.SearchFormButtonLabel}></span>
//           </button>

//           <input
//             required
//             className={css.SearchFormInput}
//             onChange={this.handleChange}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
