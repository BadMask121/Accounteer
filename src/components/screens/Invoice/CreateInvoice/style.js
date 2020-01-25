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
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    fontSize: 15,
    borderColor: '#fff',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomColor: '#000',
  },
  inputViewStyle: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomColor: '#000',
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  rightIcon: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  dateContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTitleStyle: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
    fontFamily: app.primaryFontMedium,
  },
  dateStyle: {
    fontFamily: app.primaryFontBold,
    color: 'rgba(0,0,0,0.7)',
  },
  descriptionArea: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowRadius: 1,
    elevation: 1,
  },
  saveBtn: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
};

export default style;
