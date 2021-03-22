import Link from 'next/link';

const IndexRow = props => (
  <tr>
    <td>
      <Link href={`/content/list?site_id=${props.id}`}>
        <h3><a>{props.name}</a></h3>
      </Link>
      {props.content}<br />
      {props.date} , ID: {props.id}
    </td>
    <td>
      <Link href={`/content/list?site_id=${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-primary"> Open </a>
      </Link>
      <Link href={`/content_type/${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-primary"> ContentType</a>
      </Link><br />
      <Link href={`sites/edit/${props.id}`}>
        <a className="btn btn-sm ml-2 mt-2 btn-outline-dark"> Edit </a>
      </Link>

    </td>
  </tr>
);
export default IndexRow;
