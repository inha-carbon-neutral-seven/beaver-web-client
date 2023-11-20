import React from 'react';
import { faChevronRight, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export function Expand() {
  return <FontAwesomeIcon icon={faExpand} />;
}
export function Download() {
  //Danfo 이용해서 json->csv
  return <FontAwesomeIcon icon={faDownload} />;
}
export function Next() {
  return <FontAwesomeIcon icon={faChevronRight} />;
}
