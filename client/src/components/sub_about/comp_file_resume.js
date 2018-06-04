import React from "react";
// import { Document } from 'react-pdf/dist/entry.noworker';
import { Document } from 'react-pdf';
import Page  from 'react-pdf';
// import { Document, Page } from 'react-pdf';
//import './sub_contact.css';


class FileResume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1
        };
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState( { numPages } );
    }

    componentDidMount() {
        console.log('displaying PDF of resume');
    }


    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                {/* <iframe
                    title="file"
                    style={{ width: '100%', height: '100%' }}
                    src={'./sample.pdf'}
                /> */}
                <Document 
                    file="files/Resume-Rich_Budek_2017.pdf"
                    onLoadSuccess={this.onDocumentLoad}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>       
            </div>
        );
    }
}



export default FileResume;

