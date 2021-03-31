"""
API endpoint for groups
"""

from flask_jwt_extended import jwt_required

from seamm_dashboard import authorize
from seamm_dashboard.models import Role, RoleSchema


@jwt_required(optional=True)
@authorize.has_role("admin", "group manager")
def get_roles():

    roles = Role.query.all()

    role_schema = RoleSchema(many=True)

    roles = role_schema.dump(roles)

    return roles, 200
