import styles from "./admin.module.css";

export default function AdminLoading() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div style={{ width: '200px', height: '2rem', backgroundColor: '#e2e8f0', borderRadius: '0.5rem' }}></div>
            <div style={{ width: '100px', height: '2rem', backgroundColor: '#e2e8f0', borderRadius: '0.5rem' }}></div>
          </div>
          <div style={{ width: '300px', height: '1rem', backgroundColor: '#f1f5f9', marginTop: '0.5rem', borderRadius: '0.5rem' }}></div>
        </header>

        <div className={styles.tabs} style={{ opacity: 0.5 }}>
           <div style={{ width: '80px', height: '2rem', backgroundColor: '#cbd5e1', borderRadius: '0.5rem' }}></div>
           <div style={{ width: '80px', height: '2rem', backgroundColor: '#cbd5e1', borderRadius: '0.5rem' }}></div>
           <div style={{ width: '80px', height: '2rem', backgroundColor: '#cbd5e1', borderRadius: '0.5rem' }}></div>
        </div>

        <div className={styles.card} style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="flex flex-col items-center gap-4">
            <div className={styles.spinner}></div>
            <p style={{ color: '#64748b', fontWeight: '600' }}>Cargando registros...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
