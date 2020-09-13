import datetime
from sqlalchemy.dialects.postgresql import UUID

from .. import db
from .base_table import BaseTable
from ..utils.generate_uuid import generate_uuid


class BlacklistToken(db.Model, BaseTable):
    __tablename__ = 'blacklist_tokens'

    id = db.Column(UUID(as_uuid=True),
                   primary_key=True, default=generate_uuid)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow())

    def __init__(self, token):
        self.token = token

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        token = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if token:
            return True
        else:
            return False
