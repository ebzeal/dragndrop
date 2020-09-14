//  autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const modifiedMethod: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFunction = originalMethod.bind(this);
      return bindFunction;
    }
  };
  return modifiedMethod;
}

class ProjectInput {
 templateBody: HTMLTemplateElement;
 templateOutput: HTMLDivElement;
 formElement: HTMLFormElement;
 titleInputElement: HTMLInputElement;
 descriptionInputElement: HTMLInputElement;
 peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateBody = document.getElementById('project-input')! as HTMLTemplateElement;
    this.templateOutput = document.getElementById('app')! as HTMLDivElement;

    const templateContent = document.importNode(this.templateBody.content, true);
    this.formElement = templateContent.firstElementChild as HTMLFormElement;
    this.formElement.id = 'user-input';
    this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector('#people') as HTMLInputElement;
    
    this.attachForm();
    this.configure()
  }

  private getUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    if(title.trim().length === 0 || description.trim().length === 0 ||people.trim().length === 0) {
      alert('no epmty space allowed');
      return;
    }
    return [title, description, +people]
 }

 private clearForm() {
  this.titleInputElement.value = ''
  this.descriptionInputElement.value = ''
  this.peopleInputElement.value = ''
  
 }

  @autobind
  private handleSubmit(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if(Array.isArray(userInput)){
      const [title, description, people] = userInput;
      console.log(title, description, people)
      this.clearForm()
    }
  }

  private configure() {
    // this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  private attachForm() {
    this.templateOutput.insertAdjacentElement('afterbegin', this.formElement)
  }
}


const showProject = new ProjectInput()
