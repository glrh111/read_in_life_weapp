#! /usr/bin/env python
# coding: utf-8

import sentry_sdk
sentry_sdk.init(
    dsn="https://648c4a0a238548cc8ce51b81411c220e@sentry.io/1489690",
    release="A",
)

division_by_zero = 1 / 0

