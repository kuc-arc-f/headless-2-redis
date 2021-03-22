import Link from 'next/link';
import Head from 'next/head';
//
// export default function Page(props) {
export default function Page(props){
//console.log(props.site_name )
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link href="/" className="navbar-brand"> </Link> 
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/" className="nav-link">
            <a className="ml-2"><i className="fas fa-home"></i> Home </a></Link>                    
        </li>
        <li className="nav-item active">
          <Link href={`/content/list?site_id=${props.site_id}`} className="nav-link">
            <a className="ml-2"><i className="fas fa-check"></i> Content</a>  
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href={`/content_type/${props.site_id}`} className="nav-link">
            <a className="ml-2 btn btn-sm btn-outline-primary">Site: {props.site_name}</a>  
          </Link>                    
        </li>
      </ul>
    </div>
  </nav>
  );
}
