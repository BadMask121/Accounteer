import {app} from '@src/helpers/constants';

const style = {
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    width: 250,
    alignItems: 'center',
  },
  attachmentIcon: {
    flex: 0.1,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  attachmentNumberText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
  attachmentNumber: {
    position: 'absolute',
    top: 1,
    height: 15,
    width: 15,
    right: 0,
    borderRadius: 50,
    backgroundColor: '#4D4DA6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
};

export default style;
