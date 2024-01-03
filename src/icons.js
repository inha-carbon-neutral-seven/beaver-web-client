import React from 'react';

import {
  faExpand,
  faDownload,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export function Expandicon() {
  return <FontAwesomeIcon icon={faExpand} size="2xs" />;
}
export function Downloadicon() {
  return <FontAwesomeIcon icon={faDownload} size="2xs" />;
}
export function Nexticon() {
  return <FontAwesomeIcon icon={faChevronRight} size="2xs" />;
}
export function Sendicon() {
  return <FontAwesomeIcon icon={faPaperPlane} size="lg" />;
}
