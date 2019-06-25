#! /usr/bin/env python
# coding: utf-8

import sentry_sdk
sentry_sdk.init(
    dsn="https://648c4a0a238548cc8ce51b81411c220e@sentry.io/1489690",
    release="A",
)

division_by_zero = 1 / 0


"""
export SENTRY_ORG=zzu
# new release A
sentry-cli releases new -p python A

# notify commits
sentry-cli releases set-commits --commit "glrh111/read_in_life_weapp@421c4efd36fb4c1a7d9016b35840795bac1e4f65..0b3fc9463d9de9d77ba3af834384b564f3467571" A

# new release B 对于上述代码，不执行这条命令也行。因为代码里边关联了 release，上报 event 时会自动新建 release
sentry-cli releases new -p python B

sentry-cli releases set-commits --commit "glrh111/read_in_life_weapp@0b3fc9463d9de9d77ba3af834384b564f3467571..c0a97d8317d74d635233b3e5b003ca3a764cc08b" B

"""

