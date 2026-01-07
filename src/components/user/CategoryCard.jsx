import PropTypes from 'prop-types';

const CategoryCard = ({ icon, title, desc, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group w-full"
    title={desc}
  >
    <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary/20 dark:group-hover:bg-brand-primary/30 transition">
      <div className="scale-125">{icon}</div>
    </div>
    <div className="text-center">
      <h3 className="text-xs sm:text-sm font-semibold text-brand-dark dark:text-brand-light leading-tight">{title}</h3>
    </div>
  </button>
);

CategoryCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func
};

CategoryCard.defaultProps = {
  desc: '',
  onClick: undefined
};

export default CategoryCard;

