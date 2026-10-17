import pymysql

# Django's MySQL backend expects mysqlclient; pymysql provides the same DB-API
# so it can install itself under that name and needs no compiled C extension.
pymysql.install_as_MySQLdb()
