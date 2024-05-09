# main.py
from typing import Annotated, List

from fastapi import FastAPI, HTTPException, Depends,status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from models import User, Base, Stack, Workflow


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class WorkflowUpdate(BaseModel):
    nodes: List[dict]
    edges: List[dict]

Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    name: str
    email: str
    picture:str

class StackCreate(BaseModel):
    name: str
    description: str
    user_id: str

class StackResponse(BaseModel):
    id: str
    name: str
    description: str
    user_id: str

class NodeObject(BaseModel):
    id: str
    name: str

class EdgeObject(BaseModel):
    source_id: str
    target_id: str

class WorkflowResponse(BaseModel):
    id: str
    stack_id: str
    nodes: Optional[List[dict]]
    edges: Optional[List[dict]]

def get_deb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency= Annotated[Session, Depends(get_deb)]

@app.post("/register")
def register_user(user: UserCreate, db: db_dependency):
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            return {"message": "Email already exists", "status": "success", "user_id": str(existing_user.id)}
        
        new_user = User(name=user.name, email=user.email, picture=user.picture)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User registered successfully", "status": "success", "user_id": str(new_user.id)}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@app.post("/add_stack", response_model=dict)
def add_stack(stack: StackCreate, db: db_dependency):
    try:
        new_stack = Stack(name=stack.name, description=stack.description, user_id=stack.user_id)
        db.add(new_stack)
        db.commit()
        db.refresh(new_stack)

        new_workflow = Workflow(stack_id=new_stack.id, nodes=[], edges=[])
        db.add(new_workflow)
        db.commit()
        db.refresh(new_workflow)
        return {"message": "Stack added successfully", "status": "success", "stack_id": str(new_stack.id), "workflow_id":new_workflow.id}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()

@app.get("/user/{user_id}", response_model=dict)
def get_user_by_id(user_id: str, db: db_dependency):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "picture": user.picture
        }
        return {"message": "User retrieved successfully", "status": "success", "user": user_data}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/get_stacks", response_model=dict)
def get_stacks(user_id: str, db: db_dependency):
    try:
        stacks = db.query(Stack).filter(Stack.user_id == user_id).all()
        stack_data = [{"id": str(stack.id), "name": stack.name, "description": stack.description} for stack in stacks]
        return {"message": "Stacks retrieved successfully", "status": "success","userId":user_id, "stacks": stack_data}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()

@app.get("/stack/{stack_id}", response_model=dict)
def get_stack_by_id(stack_id: str, db: db_dependency):
    try:
        stack = db.query(Stack).filter(Stack.id == stack_id).first()
        if stack is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stack not found")
        workflow = db.query(Workflow).filter(Workflow.stack_id == stack_id).first()
        workflow_id = str(workflow.id) if workflow else None
        stack_data = {
            "id": str(stack.id),
            "name": stack.name,
            "description": stack.description,
            "user_id": stack.user_id,
            "workflow_id": workflow_id
        }
        return {"message": "Stack retrieved successfully", "status": "success", "stack": stack_data}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()



@app.put("/update_workflow/{workflow_id}", response_model=dict)
def update_workflow(workflow_id: str, workflow_update: WorkflowUpdate, db: db_dependency):
    print(workflow_update)
    try:
        workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
        print(workflow.nodes)
        if workflow is None:
            raise HTTPException(status_code=404, detail="Workflow not found")
        if workflow_update.nodes is not None:
            workflow.nodes = workflow_update.nodes
        if workflow_update.edges is not None:
            workflow.edges = workflow_update.edges

        db.commit()
        db.refresh(workflow)

        return {"message": "Workflow updated successfully", "status": "success", "workflow_id": workflow_id}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    



@app.get("/workflow/{workflow_id}", response_model=WorkflowResponse)
def get_workflow_by_id(workflow_id: str, db: Session = Depends(get_deb)):
    try:
        workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
        if workflow is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found")
        
        nodes = [] if workflow.nodes is None else workflow.nodes
        edges = [] if workflow.edges is None else workflow.edges

        # Create the response model with deserialized nodes and edges
        workflow_data = WorkflowResponse(
            id=str(workflow.id),
            stack_id=str(workflow.stack_id),
            nodes=nodes,
            edges=edges
        )

        return workflow_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
