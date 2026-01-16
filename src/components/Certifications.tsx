import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, X } from 'lucide-react';
import content from '../data/content.json';
import cert1 from '../../Assets/AWS Certified Solutions Architect – Associate.png';
type Cert = {
  id: string | number;
  issuer: string;
  issuerLogo?: string; 
  title: string;
  credentialId?: string;
  date: string;
  verifyUrl?: string;
};

type ModalTab = 'certificate' | 'details';

const Certifications: React.FC = () => {
  const { certifications } = content as { certifications: Cert[] };

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('certificate');
  const isModalOpen = !!selectedCert;

  // Map string keys -> imported images
  const imageImports: Record<string, string> = {
    cert1,
  };

  const sortedCertifications = [...certifications].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

  const imageUrlFor = (cert: Cert, w = 1280, h = 800) => {
    const logo = cert.issuerLogo?.trim();
    if (logo && /^https?:\/\//i.test(logo)) return logo;
    if (logo && imageImports[logo]) return imageImports[logo];

    const idKey = `cert${String(cert.id)}`;
    if (imageImports[idKey]) return imageImports[idKey];

    return `https://picsum.photos/seed/cert-${encodeURIComponent(String(cert.id))}/${w}/${h}`;
  };

  const openModal = (cert: Cert) => {
    setSelectedCert(cert);
    setModalTab('certificate');
  };

  const closeModal = useCallback(() => setSelectedCert(null), []);

  // Close on ESC + Left/Right to toggle tabs
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setModalTab((prev) => (prev === 'certificate' ? 'details' : 'certificate'));
      }
    };
    if (isModalOpen) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <section
      id="certifications"
      className="py-20 px-4"
      aria-labelledby="certifications-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="certifications-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Certifications
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
        </div>

        {/* Sort Control */}
        <div className="mb-8">
          <div className="flex justify-end">
            <button
              onClick={toggleSortOrder}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              aria-label={`Sort by date ${sortOrder === 'desc' ? 'descending' : 'ascending'}`}
            >
              <Calendar size={16} />
              Sort by Date
              <span className="text-xs">{sortOrder === 'desc' ? '↓' : '↑'}</span>
            </button>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCertifications.map((cert) => (
            <article
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 space-y-4">
                <header className="flex items-start gap-4">
                  {/* Optional small thumbnail */}
                  <img
                    src={imageUrlFor(cert, 300, 180)}
                    alt=""
                    className="w-20 h-14 rounded-md object-cover border dark:border-gray-700 hidden sm:block"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </header>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Issued
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(cert.date)}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openModal(cert)}
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    View Certificate
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="certificate-modal-title"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex items-start gap-3 p-5 border-b border-gray-200 dark:border-gray-800">
              <div className="flex-1 min-w-0">
                <h3 id="certificate-modal-title" className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCert.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {selectedCert.issuer} · Issued {formatDate(selectedCert.date)}
                </p>
              </div>

              <button
                onClick={closeModal}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 pt-4">
              <div role="tablist" aria-label="Certificate tabs" className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                <button
                  role="tab"
                  aria-selected={modalTab === 'certificate'}
                  aria-controls="tab-panel-certificate"
                  id="tab-certificate"
                  onClick={() => setModalTab('certificate')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    modalTab === 'certificate'
                      ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Certificate
                </button>
                <button
                  role="tab"
                  aria-selected={modalTab === 'details'}
                  aria-controls="tab-panel-details"
                  id="tab-details"
                  onClick={() => setModalTab('details')}
                  className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    modalTab === 'details'
                      ? 'bg-white dark:bg-gray-900 shadow text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Details
                </button>
              </div>
            </div>

            {/* Panels */}
            <div className="p-5">
              <div
                role="tabpanel"
                id="tab-panel-certificate"
                aria-labelledby="tab-certificate"
                hidden={modalTab !== 'certificate'}
              >
                <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img
                    src={imageUrlFor(selectedCert)}
                    alt={`${selectedCert.title} certificate`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                role="tabpanel"
                id="tab-panel-details"
                aria-labelledby="tab-details"
                hidden={modalTab !== 'details'}
                className="space-y-3"
              >
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Title
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCert.title}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Issuer
                  </span>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{selectedCert.issuer}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Issued
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {formatDate(selectedCert.date)}
                  </p>
                </div>
                {selectedCert.verifyUrl && (
                  <div className="pt-2">
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Verify Credential
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
