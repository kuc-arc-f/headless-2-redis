import Link from 'next/link';

const IndexRow = props => (
  <tr>
    <td>
      <h3><a>{props.name}</a></h3>
        {props.date} , ID : {props.id}
    </td>
    <td>
      <Link href={`/content_type/edit?content_type_id=${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </td>
  </tr>
);
export default IndexRow;
