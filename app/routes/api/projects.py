"""
API calls for projects
"""

from app.models import Project, ProjectSchema, Job, JobSchema
from flask import Response

__all__ = ['get_projects', 'get_project', 'list_projects', 'get_project_jobs']


def get_projects(description=None, limit=None):
    
    # If limit is not set, set limit to all jobs in DB.
    if limit is None:
        limit = Project.query.count()
    
    if description is not None:
        projects = Project.query.filter(
            Project.description.contains(description)
        ).limit(limit)
    else:
        projects = Project.query.limit(limit)

    projects_schema = ProjectSchema(many=True)
    
    return projects_schema.dump(projects), 200


def get_project(id):
    """
    Function for api endpoint api/projects/{id}

    Parameters
    ----------
    id : the ID of the project to return
    """
    project = Project.query.get(id)

    if project is None:
        return Response(status=404)

    project_schema = ProjectSchema(many=False)
    return project_schema.dump(project), 200

def get_project_jobs(id):
    """
    Function for api endpoint api/projects/{id}/jobs. Get jobs associated with a project.


    Parameters
    ----------
    id : the ID of the project to return
    """

    project = Project.query.get(id)

    if project is None:
        return Response(status=404)
    
    jobs = []
    for job in project.jobs:
        jobs.append(Job.query.get(job.id))
    
    jobs_schema = JobSchema(many=True)

    return jobs_schema.dump(jobs), 200


def list_projects():
    """List the projects in the datastore.
    """
    projects = Project.query.all()

    result = []
    for project in projects:
        result.append(project.name)

    return {'projects': sorted(result)}, 200
    
