import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <div>
    <div className="row">
      <div className="col-sm-8">
        <button className="btn btn-sm btn-outline-primary">{props.name}
        </button>
      </div>
      <div className="col-sm-4">
        <span className="name_arrow">
          <i className="fas fa-arrow-circle-right ml-3"></i>
        </span>
      </div>
    </div>
    <hr className="mt-2 mb-2"/>
    <style>{`
      .name_arrow{ 
        font-size: 20px;  margin-right: 10px;
      }
    `}
    </style>    
  </div>
);
export default IndexRow;
