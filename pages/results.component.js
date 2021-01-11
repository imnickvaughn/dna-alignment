import React from 'react'
import styles from '../styles/results.module.css'
import { CircularProgress, Paper } from '@material-ui/core'

// This is where we display the results from our sequence query.
export default function ResultsComponent(props) {

    // Here is where we display the search result.
    // A temporary search result state is needed before the results have come from the server.
    // Then we display the search results which will show either the result information or NOT FOUND
    const isLoading = (seq, index) => {
        console.log(seq)
        if (seq) {
            if (seq.status === 1) {
                return <>
                    <div className={`${styles.lessEmphasis} ${styles.loadingResults}`}><span>List Number: </span>#{index + 1}</div>
                    <div className={`${styles.lessEmphasis} ${styles.loadingResults}`}><span>Query Name: </span>{seq.queryName}</div>
                    <div className={`${styles.lessEmphasis} ${styles.loadingResults}`}><span>Query Sequence: </span>{seq.querySeq}</div>
                    <CircularProgress className={styles.loader} />
                </>
            }
            else {
                return <>
                    <div><span className={styles.lessEmphasis}>List Number: </span>#{index + 1}</div>
                    <div><span className={styles.lessEmphasis}>Found Sequence Range: </span>{seq.index}</div>
                    <div><span className={styles.lessEmphasis}>Query Name: </span>{seq.queryName}</div>
                    <div><span className={styles.lessEmphasis}>Query Sequence: </span>{seq.querySeq}</div>
                    <div><span className={styles.lessEmphasis}>Reference: </span>{seq.ref}</div>
                    <div><span className={styles.lessEmphasis}>Name: </span>{seq.name}</div>
                    <div>
                        <span className={styles.lessEmphasis}>Sequence: </span>
                        {seq.seqLeft}
                        <span className={styles.querySeqHighlight}>{seq.seqKey}</span>
                        {seq.seqRight}
                    </div>
                </>
            }
        }
    }

    return (
        <>
            <div className="columnContainer">
                <h1> BLAST REPORT</h1>
                {Object.values(props.matches).map((seq, index) => (
                    <React.Fragment key={index} >
                        <Paper elevation={3} className={styles.result}>
                            {isLoading(seq, index)}
                        </Paper>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
