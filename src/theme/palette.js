import { EOSCR_THEME } from '@eoscostarica/eoscr-theme'
import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  black,
  white,
  primary: {
    main: EOSCR_THEME.palette.primary.main,
    light: EOSCR_THEME.palette.primary.light,
    contrastText: EOSCR_THEME.palette.primary.contrastText,
    800: EOSCR_THEME.palette.primary[800],
    700: EOSCR_THEME.palette.primary[700],
    600: EOSCR_THEME.palette.primary[600],
    500: EOSCR_THEME.palette.primary[500],
    400: EOSCR_THEME.palette.primary[400],
    300: EOSCR_THEME.palette.primary[300],
    200: EOSCR_THEME.palette.primary[200],
    100: EOSCR_THEME.palette.primary[100],
    50: EOSCR_THEME.palette.primary[50],
    onPrimaryHighEmphasizedText:
      EOSCR_THEME.palette.primary.onPrimaryHighEmphasizedText,
    onPrimaryMediumEmphasizedText:
      EOSCR_THEME.palette.primary.onPrimaryMediumEmphasizedText,
    onPrimaryDisabledText: EOSCR_THEME.palette.primary.onPrimaryDisabledText,
    highEmphasizedBlackText:
      EOSCR_THEME.palette.primary.highEmphasizedBlackText,
    mediumEmphasizedBlackText:
      EOSCR_THEME.palette.primary.mediumEmphasizedBlackText,
    disabledBlackText: EOSCR_THEME.palette.primary.disabledBlackText
  },
  secondary: {
    main: EOSCR_THEME.palette.secondary.main,
    light: EOSCR_THEME.palette.secondary.light,
    dark: EOSCR_THEME.palette.secondary.dark,
    contrastText: EOSCR_THEME.palette.secondary.contrastText,
    900: EOSCR_THEME.palette.secondary[900],
    800: EOSCR_THEME.palette.secondary[800],
    700: EOSCR_THEME.palette.secondary[700],
    600: EOSCR_THEME.palette.secondary[600],
    500: EOSCR_THEME.palette.secondary[500],
    400: EOSCR_THEME.palette.secondary[400],
    300: EOSCR_THEME.palette.secondary[300],
    200: EOSCR_THEME.palette.secondary[200],
    100: EOSCR_THEME.palette.secondary[100],
    50: EOSCR_THEME.palette.secondary[50],
    onSecondaryHighEmphasizedText:
      EOSCR_THEME.palette.secondary.onSecondaryHighEmphasizedText,
    onSecondaryMediumEmphasizedText:
      EOSCR_THEME.palette.secondary.onSecondaryMediumEmphasizedText,
    onSecondaryDisabledText:
      EOSCR_THEME.palette.secondary.onSecondaryDisabledText,
    highEmphasizedWhiteText:
      EOSCR_THEME.palette.secondary.highEmphasizedWhiteText,
    mediumEmphasizedWhiteText:
      EOSCR_THEME.palette.secondary.mediumEmphasizedWhiteText,
    disabledWhiteText: EOSCR_THEME.palette.secondary.disabledWhiteText
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: black,
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
}
