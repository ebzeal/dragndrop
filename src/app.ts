//  Validation
interface Validatable {
  value: string | number;
  required?: boolean; // the ? allows this value to be optional, you could also do boolean | undefined
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;
  if(input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0
  }
  if(input.minLength != null && typeof input.value === 'string'){
    isValid = isValid && input.value.length >= input.minLength;
  }
  if(input.maxLength != null && typeof input.value === 'string'){
    isValid = isValid && input.value.length <= input.maxLength;
  }
  if(input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min
  }
  if(input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max
  }
  return isValid;
}


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

    const titleValidatable: Validatable = {
      value: title,
      required: true,
      minLength:2
    }

    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5
    }

    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max:5
    }

    if(!validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('please enter valid data');
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
