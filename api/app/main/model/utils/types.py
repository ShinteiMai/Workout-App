from sqlalchemy.types import TypeDecorator, Unicode
from sqlalchemy.dialects.mysql.base import MSBinary
import uuid

id_column_name = "id"


class UUID(TypeDecorator):
    impl = MSBinary

    def __init__(self):
        self.impl.length = 16
        TypeDecorator.__init__(self, length=self.impl.length)

    def process_bind_param(self, value, dialect=None):
        if value and isinstance(value, uuid.UUID):
            return value.bytes
        elif value and not isinstance(value, uuid.UUID):
            raise ValueError('value {} is not a valid uuid.UUID'.format(value))
        else:
            return None

    def process_result_value(self, value, dialect):
        if value:
            return uuid.UUID(bytes=value)
        else:
            return None

    def is_mutable(self):
        return False
