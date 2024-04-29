import css from 'styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={css.Button}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
