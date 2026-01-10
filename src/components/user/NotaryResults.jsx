import PropTypes from 'prop-types';
import { MapPin, Phone, Mail, Star, CheckCircle, Building2 } from 'lucide-react';

const NotaryResults = ({ notaries, searchParams }) => {
  if (!notaries || notaries.length === 0) {
    return (
      <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Building2 size={64} className="text-brand-muted dark:text-brand-light/50" />
          <div>
            <h3 className="text-lg font-bold text-brand-dark dark:text-brand-light mb-2">
              Tidak ada notaris ditemukan
            </h3>
            <p className="text-sm text-brand-muted dark:text-brand-light/70">
              {searchParams
                ? `Tidak ada notaris yang ditemukan untuk wilayah yang dipilih. Coba pilih wilayah lain atau kategori yang berbeda.`
                : 'Silakan pilih provinsi dan kota/kabupaten untuk mencari notaris.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Info */}
      {searchParams && (
        <div className="rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 p-4">
          <p className="text-sm text-brand-dark dark:text-brand-light font-medium mb-2">
            Hasil Pencarian:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-brand-muted dark:text-brand-light/70">
            <span className="px-2 py-1 rounded bg-brand-surface dark:bg-brand-dark">
              {searchParams.province?.name}
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-brand-surface dark:bg-brand-dark">
              {searchParams.regency?.name}
            </span>
            {searchParams.district && (
              <>
                <span>→</span>
                <span className="px-2 py-1 rounded bg-brand-surface dark:bg-brand-dark">
                  {searchParams.district.name}
                </span>
              </>
            )}
            {searchParams.category && (
              <>
                <span>|</span>
                <span className="px-2 py-1 rounded bg-brand-primary/20 text-brand-primary">
                  {searchParams.category}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-brand-muted dark:text-brand-light/70 mt-2">
            Ditemukan {notaries.length} notaris
          </p>
        </div>
      )}

      {/* Notaries List */}
      <div className="space-y-4">
        {notaries.map((notary) => (
          <div
            key={notary.id}
            className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6 hover:shadow-md transition-all"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left: Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary">
                    <Building2 size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-brand-dark dark:text-brand-light">
                        {notary.name}
                      </h3>
                      {notary.verified && (
                        <CheckCircle size={20} className="text-brand-primary" title="Terverifikasi" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                          {notary.rating}
                        </span>
                      </div>
                      <span className="text-sm text-brand-muted dark:text-brand-light/70">
                        • {notary.experience} pengalaman
                      </span>
                    </div>
                    <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-3">
                      {notary.description}
                    </p>
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="space-y-2 pl-20 lg:pl-0">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin size={16} className="text-brand-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-brand-dark dark:text-brand-light">{notary.address}</p>
                      <p className="text-brand-muted dark:text-brand-light/70">
                        {notary.district.name}, {notary.regency.name}, {notary.province.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-brand-primary" />
                      <a
                        href={`tel:${notary.phone}`}
                        className="text-brand-dark dark:text-brand-light hover:text-brand-primary transition"
                      >
                        {notary.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-brand-primary" />
                      <a
                        href={`mailto:${notary.email}`}
                        className="text-brand-dark dark:text-brand-light hover:text-brand-primary transition"
                      >
                        {notary.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Categories */}
              <div className="lg:w-64 flex-shrink-0">
                <h4 className="text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                  Kategori Layanan:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {notary.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full mt-4 px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:opacity-90 transition"
                >
                  Pilih Notaris
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

NotaryResults.propTypes = {
  notaries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      province: PropTypes.object.isRequired,
      regency: PropTypes.object.isRequired,
      district: PropTypes.object.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      experience: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      verified: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  searchParams: PropTypes.shape({
    province: PropTypes.object,
    regency: PropTypes.object,
    district: PropTypes.object,
    category: PropTypes.string
  })
};

NotaryResults.defaultProps = {
  notaries: [],
  searchParams: null
};

export default NotaryResults;
