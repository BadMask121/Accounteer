import {app} from '@src/helpers/constants';
const style = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
  },
  headerTitle: {
    flex: 0.12,
  },
  imageOverlay: {
    position: 'absolute',
    backgroundColor: '#000',
    top: 0,
    zIndex: 1,
    opacity: 0.4,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 0.35,
  },
  salesContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
};

export default style;
