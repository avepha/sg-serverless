export default function getTimeZoneByTel(tel) {
  switch (tel.substr(0,3)) {
    case '+66':
      return 'Asia/Bangkok'
    case '+81':
      return 'Asia/Tokyo'
    default:
      return 'Asia/Bangkok'
  }
}
