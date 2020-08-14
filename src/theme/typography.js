import { EOSCR_THEME } from '@eoscostarica/eoscr-theme'

import palette from './palette'

export default {
  fontFamily: ["'PT Sans', sans-serif;", "'Open Sans', sans-serif;"].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h1.fontWeight,
    fontSize: EOSCR_THEME.typography.h1.size,
    letterSpacing: EOSCR_THEME.typography.h1.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h1.fontFamily,
    lineHeight: EOSCR_THEME.typography.h1.lineHeight
  },
  h2: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h2.fontWeight,
    fontSize: EOSCR_THEME.typography.h2.fontSize,
    letterSpacing: EOSCR_THEME.typography.h2.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h2.fontFamily,
    lineHeight: EOSCR_THEME.typography.h2.lineHeight
  },
  h3: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h3.fontWeight,
    fontSize: EOSCR_THEME.typography.h3.fontSize,
    letterSpacing: EOSCR_THEME.typography.h3.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h3.fontFamily,
    lineHeight: EOSCR_THEME.typography.h3.lineHeight
  },
  h4: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h4.fontWeight,
    fontSize: EOSCR_THEME.typography.h4.fontSize,
    letterSpacing: EOSCR_THEME.typography.h4.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h4.fontFamily,
    lineHeight: EOSCR_THEME.typography.h2.lineHeight
  },
  h5: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h5.fontWeight,
    fontSize: EOSCR_THEME.typography.h5.fontSize,
    letterSpacing: EOSCR_THEME.typography.h5.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h5.fontFamily,
    lineHeight: EOSCR_THEME.typography.h5.lineHeight
  },
  h6: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.h6.fontWeight,
    fontSize: EOSCR_THEME.typography.h6.fontSize,
    letterSpacing: EOSCR_THEME.typography.h6.letterSpacing,
    fontFamily: EOSCR_THEME.typography.h6.fontFamily,
    lineHeight: EOSCR_THEME.typography.h6.lineHeight
  },
  subtitle1: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.subtitle1.fontWeight,
    fontSize: EOSCR_THEME.typography.subtitle1.fontSize,
    letterSpacing: EOSCR_THEME.typography.subtitle1.letterSpacing,
    fontFamily: EOSCR_THEME.typography.subtitle1.fontFamily,
    lineHeight: EOSCR_THEME.typography.subtitle1.lineHeight
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: EOSCR_THEME.typography.subtitle2.fontWeight,
    fontSize: EOSCR_THEME.typography.subtitle2.fontSize,
    letterSpacing: EOSCR_THEME.typography.subtitle2.letterSpacing,
    fontFamily: EOSCR_THEME.typography.subtitle2.fontFamily,
    lineHeight: EOSCR_THEME.typography.subtitle2.lineHeight
  },
  body1: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.body1.fontWeight,
    fontSize: EOSCR_THEME.typography.body1.fontSize,
    letterSpacing: EOSCR_THEME.typography.body1.letterSpacing,
    fontFamily: EOSCR_THEME.typography.body1.fontFamily,
    lineHeight: EOSCR_THEME.typography.body1.lineHeight
  },
  body2: {
    color: palette.text.secondary,
    fontWeight: EOSCR_THEME.typography.body2.fontWeight,
    fontSize: EOSCR_THEME.typography.body2.fontSize,
    letterSpacing: EOSCR_THEME.typography.body2.letterSpacing,
    fontFamily: EOSCR_THEME.typography.body2.fontFamily,
    lineHeight: EOSCR_THEME.typography.body2.lineHeight
  },
  button: {
    color: palette.text.primary,
    fontWeight: EOSCR_THEME.typography.button.fontWeight,
    fontFamily: EOSCR_THEME.typography.button.fontFamily,
    letterSpacing: EOSCR_THEME.typography.button.letterSpacing,
    fontSize: EOSCR_THEME.typography.button.fontSize,
    lineHeight: EOSCR_THEME.typography.button.lineHeight
  },
  caption: {
    color: palette.text.secondary,
    fontSize: EOSCR_THEME.typography.caption.fontSize,
    letterSpacing: EOSCR_THEME.typography.caption.letterSpacing,
    fontFamily: EOSCR_THEME.typography.caption.fontFamily,
    lineHeight: EOSCR_THEME.typography.caption.lineHeight
  },
  overline: {
    color: palette.text.secondary,
    fontSize: EOSCR_THEME.typography.overline.fontSize,
    fontWeight: EOSCR_THEME.typography.overline.fontWeight,
    letterSpacing: EOSCR_THEME.typography.overline.letterSpacing,
    lineHeight: EOSCR_THEME.typography.overline.lineHeight,
    fontFamily: EOSCR_THEME.typography.overline.fontFamily,
    textTransform: 'uppercase'
  }
}
