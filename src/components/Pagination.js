import styles from '@/app/page.module.css';

export default function Pagination({ page, setPage, total }) {
    return (
        <ul className={styles.pagination}>
            <li className={styles.page} onClick={() => setPage((prev) => prev - 1)}>
                <button disabled={page === 1} >
                    Previous
                </button>
            </li>
            {Array.from({ length: Math.ceil(total / 10) }).map((_, index) => (
                <li key={index} onClick={() => setPage(index + 1)} className={`${styles.page} ${index + 1 === page ? styles.active : ''}`}>
                    <button disabled={page === index + 1} >
                        {index + 1}
                    </button>
                </li>
            ))}
            <li className={styles.page} onClick={() => setPage((prev) => prev + 1)}>
                <button disabled={page === Math.ceil(total / 10)} >
                    Next
                </button>
            </li>
        </ul>
    );
}